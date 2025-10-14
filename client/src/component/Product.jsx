import { useState, useEffect } from "react";
import { Button, Drawer, Space, Spin, Row, Col, Card, Form, Popconfirm, Flex, Typography } from "antd";
import { LoadingOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { fetchCards, createCard, updateCard, deleteCard } from "../http/api";
import ProductForm from "./ProductForm";

const { Text, Title } = Typography;

export default function Product() {
    const [form] = Form.useForm();

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
            <Flex align="vertical" justify="space-between" style={{ padding: '16px' }}>
                <Text type="secondary">Manage your products easily</Text>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>Add Product</Button>
            </Flex>
            <Row gutter={[16, 16]}>
                {products?.map(product => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                        <Card
                            title={<Title strong>product.name</Title>}
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                padding: '16px',
                                transition: 'transform 0.2s',
                            }}
                            extra={
                                <Space>
                                    <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        onClick={() => setCurrentCard(product)}
                                    />
                                    <Popconfirm
                                        title="Are you sure you want to delete this product?"
                                        onConfirm={() => deleteProduct(product.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="text" icon={<DeleteOutlined />} danger />
                                    </Popconfirm>
                                </Space>
                            }
                        >
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p><strong>Stock:</strong> {product.stock}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Drawer
                title={currentCard ? "Update Product" : "Create Product"}
                width={720}
                destroyOnHidden={true}
                open={drawerOpen}
                onClose={() => { setDrawerOpen(false); form.resetFields(); setCurrentCard(null) }}
                extra={<Space><Button onClick={() => { setDrawerOpen(false); form.resetFields() }}>Cancel</Button><Button type="primary" onClick={onHandleSubmit}>Submit</Button></Space>}>
                <Form form={form} layout="vertical" >
                    <ProductForm />
                </Form>
            </Drawer>
        </Space>
    )
}