import { useState } from "react";
import { Button, Drawer, Space, Spin, Table, Form, theme } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { fetchCards, createCard } from "../http/api";
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

    const [drawerOpen, setDrawerOpen] = useState(false);

    const queryClient = useQueryClient();

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetchCards();
            return res.data.data;
        }
    })

    const { mutate: userMutate } = useMutation({
        mutationKey: ['users'],
        mutationFn: async (data) => createCard(data).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    })

    console.log("products", products);

    const onHandleSubmit = async () => {
        form.submit();
        console.log('Data : ', form.getFieldsValue());
        await userMutate(form.getFieldsValue());
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
                render: (_, recod) => {
                    return (
                        <Space>
                            <Button onClick={() => {
                                // setCurrentUser(recod)
                            }} type="link" size="small">Edit</Button>
                        </Space>
                    )
                }
            }]} />
            <Drawer title="Create Card" width={720} destroyOnHidden={true} open={drawerOpen} onClose={() => { setDrawerOpen(false); form.resetFields() }} extra={<Space><Button>Cancel</Button><Button type="primary" onClick={onHandleSubmit}>Submit</Button></Space>} styles={{ body: { background: colorBgLayout } }}>
                <Form form={form} layout="vertical" >
                    <ProductForm />
                </Form>
            </Drawer>
        </Space>
    )
}