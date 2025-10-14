import { Row, Col, Form, Input } from 'antd';
export default function ProductForm() {
    return (
        <Row>
            <Col span={24}>
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
                            <Input placeholder='' size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required' }]}>
                            <Input placeholder='' size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Categoty" name="category" rules={[{ required: true, message: 'Category is required' }]}>
                            <Input placeholder='' size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Stock is required' }]}>
                            <Input placeholder='' size="large" />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}