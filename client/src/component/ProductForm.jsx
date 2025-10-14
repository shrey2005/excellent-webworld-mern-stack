import { Button, Row, Col, Form, Input, Upload } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
export default function ProductForm() {
    const [fileList, setFileList] = useState([])
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
                    <Col span={24}>
                        <Form.Item name="image" label="Product Image">
                            <Upload
                                fileList={fileList}
                                beforeUpload={(file) => {
                                    setFileList([file]); // Allow only 1 file
                                    return false; // Prevent auto upload
                                }}
                                onRemove={() => setFileList([])}
                            >
                                <Button icon={<UploadOutlined />}>Select Image</Button>
                            </Upload>
                        </Form.Item>
                    </Col>

                </Row>
            </Col>
        </Row>
    )
}