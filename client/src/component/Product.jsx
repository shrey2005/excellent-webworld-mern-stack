import { useState, useEffect } from "react";
import { Button, Drawer, Space, Spin, Table, Form, theme, Popconfirm } from "antd";
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { fetchCards, createCard, updateCard, deleteCard } from "../http/api";
import ProductForm from "./ProductForm";

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'address',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    }
];

export default function Product() {
    const [form] = Form.useForm();

    const {
        token: { colorBgLayout },
    } = theme.useToken();

    const [currentCard, setCurrentCard] = useState(null)
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (currentCard) {
            form.setFieldsValue(currentCard)
            setDrawerOpen(true)
        }
    }, [currentCard, form])

    const queryClient = useQueryClient();

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetchCards();
            return res.data.data;
        }
    })

    const { mutate: userMutate } = useMutation({
        mutationKey: ['cards'],
        mutationFn: async (data) => createCard(data).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    })


    const { mutate: updateUserMutation } = useMutation({
        mutationKey: ['update-cards'],
        mutationFn: async (data) => updateCard(currentCard.id, data).then((res) => res.data),
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    const { mutate: deleteProduct } = useMutation({
        mutationFn: async (id) => deleteCard(id).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    })

    const onHandleSubmit = async () => {
        form.submit();
        console.log('Data : ', form.getFieldsValue());

        const isEditMode = !!currentCard;
        if (isEditMode) {
            await updateUserMutation(form.getFieldsValue());
        }
        else {
            await userMutate(form.getFieldsValue());
        }
        form.resetFields();
        setDrawerOpen(false);
    }

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>Add Restaurant</Button>
            <Table dataSource={products} columns={[...columns,
            {
                title: 'Actions',
                key: 'actions',
                render: (_, record) => {
                    return (
                        <Space>
                            <Button onClick={() => {
                                setCurrentCard(record)
                            }} type="link" size="small">
                                Edit
                            </Button>
                            <Popconfirm
                                title="Are you sure you want to delete this product?"
                                onConfirm={() => deleteProduct(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="link" size="small" danger icon={<DeleteOutlined />}>
                                    Delete
                                </Button>
                            </Popconfirm>
                        </Space>
                    )
                }
            }]} />
            <Drawer title="Create Card" width={720} destroyOnHidden={true} open={drawerOpen} onClose={() => { setDrawerOpen(false); form.resetFields() }} extra={<Space><Button onClick={() => { setDrawerOpen(false); form.resetFields() }}>Cancel</Button><Button type="primary" onClick={onHandleSubmit}>Submit</Button></Space>} styles={{ body: { background: colorBgLayout } }}>
                <Form form={form} layout="vertical" >
                    <ProductForm />
                </Form>
            </Drawer>
        </Space>
    )
}