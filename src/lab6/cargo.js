import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React from "react";
import {useForm} from "react-hook-form";


export default function Cargo() {

    function blockInvalidChar(e) {
        let regex = new RegExp("^[0-9]+$");
        let key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!regex.test(key)) {
            e.preventDefault();
            return false;
        }
    }

    return (
        <Row className="align-items-center">
            <Col>
                <span style={{color: "white"}}>Характеристика місць</span>
                <Row className="align-items-center">
                    <Form.Group as={Col} sm={2}>
                        <Form.Label style={{fontSize: "10px"}}>Кількість</Form.Label>
                        <input onKeyPress={event => blockInvalidChar(event)} {...register("count", {
                            required: "Обов'язкове поле!",
                            max: {value: 100, message: "Максимальна к-сть 100!"},
                            min: {value: 1, message: "Мінімальне значення 1!"},
                            pattern: {value: /^[0-9]+$/i, message: "Допустимі числові значення!"}
                        })} style={{width: "68.6667px", height: "31px"}}
                               type={"number"}
                               aria-invalid={errors.count?.type === "required" ? "true" : "false"}></input>
                    </Form.Group>
                    <Form.Group as={Col} sm={2}>
                        <Form.Label style={{fontSize: "10px"}}>Оголошена вартість</Form.Label>
                        <Form.Control
                            onKeyPress={event => blockInvalidChar(event)} {...register("cost", {
                            required: "Обов'язкове поле!",
                            max: {value: 100000, message: "Макс. знач. 100000!"},
                            min: {value: 10, message: "Мінімальне значення 10!"},
                            pattern: {value: /^[0-9]+$/i, message: "Допустимі числові значення!"}
                        })} size="sm"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} sm={1}>
                        <span style={{color: "white", fontSize: "12px"}}>грн</span>
                    </Form.Group>

                    <Form.Group as={Col} sm={2}>
                        <Form.Label style={{fontSize: "10px"}}>Вага</Form.Label>
                        <Form.Control
                            onKeyPress={event => blockInvalidChar(event)} {...register("weight", {
                            required: "Обов'язкове поле!",
                            max: {value: 100, message: "Макс. знач. 100!"},
                            min: {value: 1, message: "Мінімальне значення 1!"},
                            pattern: {value: /^[0-9]+$/i, message: "Допустимі числові значення!"}
                        })}
                            size="sm"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} sm={1}>
                        <span style={{color: "white", fontSize: "12px"}}>кг</span>
                    </Form.Group>
                    <Form.Group as={Col} sm={1}>
                        <Form.Label style={{fontSize: "10px"}}>Довжина</Form.Label>
                        <Form.Control
                            onKeyPress={event => blockInvalidChar(event)} {...register("length", {
                            required: "Обов'язкове поле довжини!",
                            max: {value: 300, message: "Макс. значення довжини 300!"},
                            min: {value: 5, message: "Мінімальне значення довжини 5!"},
                            pattern: {value: /^[0-9]+$/i, message: "Допустимі числові значення!"}
                        })}
                            size="sm"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} sm={1}>
                        <Form.Label style={{fontSize: "10px"}}>Ширина</Form.Label>
                        <Form.Control
                            onKeyPress={event => blockInvalidChar(event)} {...register("width", {
                            required: "Обов'язкове поле ширини!",
                            max: {value: 300, message: "Макс. значення ширини 300!"},
                            min: {value: 5, message: "Мінімальне значення ширини 5!"},
                            pattern: {value: /^[0-9]+$/i, message: "Допустимі числові значення!"}
                        })}
                            size="sm"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} sm={1}>
                        <Form.Label style={{fontSize: "10px"}}>Висота</Form.Label>
                        <Form.Control
                            onKeyPress={event => blockInvalidChar(event)} {...register("height", {
                            required: "Обов'язкове поле висоти!",
                            max: {value: 500, message: "Макс. значення висоти 500!"},
                            min: {value: 5, message: "Мінімальне значення висоти 5!"},
                            pattern: {value: /^[0-9]+$/i, message: "Допустимі числові значення!"}
                        })}
                            size="sm"></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} sm={1}>
                        <span style={{color: "white", fontSize: "12px"}}>см</span>
                    </Form.Group>
                </Row>
            </Col>
        </Row>)
}