import {useFieldArray, useForm, useWatch} from "react-hook-form";
import "./styles.css"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


export default function Task2Form() {
    const {register, setValue, reset, control, handleSubmit, watch, formState: {errors}} = useForm({
        defaultValues: {
            palletsFields: [{}],
            cargosFields: [{}]
        }
    });
    const onSubmit = data => {
        console.log(data);
    }

    const watchShowDel = watch("show_del", false)
    let watchShowTypeDel = watch("del_select", false)
    let watchShowPacking = watch("packing", false)
    let watchShowPallet = watch("type_cargo", "Вантажі")


    const {fields: palletFields, append: palletAppend, remove: palletRemove} = useFieldArray({
        control,
        name: "palletsFields",
    })
    const {fields: cargoFields, append: cargoAppend, remove: cargoRemove, update} = useFieldArray({
        control,
        name: "cargosFields",
    })


    function blockInvalidChar(e) {
        let regex = new RegExp("^[0-9]+$");
        let key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (!regex.test(key)) {
            e.preventDefault();
            return false;
        }
    }

    const [checked, setChecked] = useState(false);


    function PackingPallet() {
        return (
            <div>
                <Row>
                    <Col sm={4}/>
                    <Col><span style={{color: "white", fontSize: "12px"}}>Вид пакування</span></Col>
                    <Col sm={4}><span style={{color: "white", fontSize: "12px"}}>Кількість</span></Col>
                </Row>
                <ul>
                    {cargoFields.map((item, index) => {
                        console.log(item)
                        return (
                            <li style={{listStyleType: "none"}} key={item.id}>
                                <Row style={{paddingBottom: "40px"}} className="align-items-center">
                                    <Col sm={4}/>
                                    <Col sm={4}>
                                        <Form.Group className={"mb-6"}>
                                            <Form.Select
                                                size="sm" {...register(`palletsFields.${index}.packing_select`)}>
                                                <option value={"Конверт з ПБ плівкою С/13 (150х215) мм"}>Конверт з ПБ
                                                    плівкою
                                                    С/13 (150х215) мм
                                                </option>
                                                <option value={"Коробка (20 кг)"}>Коробка (20 кг)</option>
                                                <option value={"Коробка (0,5 кг) стандартна"}>Коробка (0,5 кг)
                                                    стандартна
                                                </option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={2}>
                                        <Form.Group className={"mb-6"}>
                                            <input
                                                onKeyPress={event => blockInvalidChar(event)} {...register(`palletsFields.${index}.count_packing`, {})}
                                                style={{width: "68.6667px", height: "31px"}}

                                                type={"number"}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </li>
                        )
                    })

                    }
                </ul>
            </div>
        )

    }

    function Pallet() {
        return (
            <div>
                <span style={{color: "white"}}>Палети</span>
                <ul>
                    {palletFields.map((item, index) => {
                        return (
                            <li style={{listStyleType: "none"}} key={item.id}>
                                <div>
                                    <Row className="align-items-center">
                                        <Col>
                                            <Row className="align-items-center">
                                                <Form.Group style={{height: "89px"}} as={Col} sm={4}>
                                                    <Form.Label style={{fontSize: "10px"}}>Тип палети</Form.Label>
                                                    <Form.Select
                                                        size="sm" {...register(`palletsFields.${index}.type_pallet`)}>
                                                        <option value={"Палета від 1,5 м2 до 2 м2"}>Палета від 1,5 м2 до
                                                            2
                                                            м2
                                                        </option>
                                                        <option value={"Палета від 1 м2 до 1,49 м2 (612)"}>Палета від 1
                                                            м2
                                                            до 1,49
                                                            м2
                                                            (612)
                                                        </option>
                                                        <option value={"Палета від 0,5 м2 до 0,99 м2 (408)"}>Палета від
                                                            0,5
                                                            м2 до
                                                            0,99 м2
                                                            (408)
                                                        </option>
                                                        <option value={"Палета до 0,49 м2 (204)"}>Палета до 0,49 м2
                                                            (204)
                                                        </option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={2}>
                                                    <Form.Label style={{fontSize: "10px"}}>Оголошена
                                                        вартість</Form.Label>
                                                    <Form.Control
                                                        onKeyPress={event => blockInvalidChar(event)} {...register(`palletsFields.${index}.cost_pallet`, {
                                                        required: "Обов'язкове поле!",
                                                        max: {value: 100000, message: "Макс. знач. 100000!"},
                                                        min: {value: 10, message: "Мінімальне значення 10!"},
                                                        pattern: {
                                                            value: /^[0-9]+$/i,
                                                            message: "Допустимі числові значення!"
                                                        }
                                                    })} size="sm"/>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={3}>
                                                    <Form.Label style={{fontSize: "10px"}}>Кількість</Form.Label>
                                                    <input
                                                        onKeyPress={event => blockInvalidChar(event)} {...register(`palletsFields.${index}.count_pallet`, {
                                                        required: "Обов'язкове поле!",
                                                        max: {value: 100, message: "Максимальна к-сть 100!"},
                                                        min: {value: 1, message: "Мінімальне значення 1!"},
                                                        pattern: {
                                                            value: /^[0-9]+$/i,
                                                            message: "Допустимі числові значення!"
                                                        }
                                                    })} style={{width: "170px", height: "31px"}}
                                                        type={"number"}
                                                        aria-invalid={errors.count?.type === "required" ? "true" : "false"}/>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <span style={{color: "white", fontSize: "12px"}}>од</span>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <button style={{width: "50px", height: "50px"}} type="button"
                                                            onClick={() => palletRemove(index)}>
                                                        X
                                                    </button>
                                                </Form.Group>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <Row className="align-items-center">
                                                <Col sm={4}/>
                                                <Col sm={4}>
                                                    {errors?.['palletsFields']?.[index]?.['cost_pallet'] &&
                                                    <p style={{fontSize: "10px"}}
                                                       role="alert">{errors?.['palletsFields']?.[index]?.['cost_pallet']?.['message']}</p>}
                                                </Col>
                                                <Col sm={4}>
                                                    {errors?.['palletsFields']?.[index]?.['count_pallet'] &&
                                                    <p style={{fontSize: "10px"}}
                                                       role="alert">{errors?.['palletsFields']?.[index]?.['count_pallet']?.['message']}</p>}
                                                </Col>
                                                <Col sm={1}/>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
                <button style={{fontSize: "12px"}} type="button" onClick={() => palletAppend({})}>
                    Додати
                </button>
            </div>
        )
    }


    function Cargo() {
        return (
            <div>
                <span style={{color: "white"}}>Характеристика місць</span>
                <ul>
                    {cargoFields.map((item, index) => {
                        return (
                            <li style={{listStyleType: "none"}} key={item.id}>
                                <Container>
                                    <Row className="align-items-center">
                                        <Col>
                                            <Row className="align-items-center">
                                                <Form.Group as={Col} sm={2}>
                                                    <Form.Label style={{fontSize: "10px"}}>Кількість</Form.Label>
                                                    <input
                                                        onInput={event => setValue(`palletsFields.${index}.count_packing`, event.target.value)}
                                                        /*onKeyPress={event => blockInvalidChar(event) && console.log("123")}*/ {...register(`cargosFields.${index}.count`, {
                                                        required: "Обов'язкове поле!",
                                                        max: {value: 100, message: "Максимальна к-сть 100!"},
                                                        min: {value: 1, message: "Мінімальне значення 1!"},
                                                        pattern: {
                                                            value: /^[0-9]+$/i,
                                                            message: "Допустимі числові значення!"
                                                        }
                                                    })} style={{width: "68.6667px", height: "31px"}}
                                                        type={"number"}
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col} sm={2}>
                                                    <Form.Label style={{fontSize: "10px"}}>Оголошена
                                                        вартість</Form.Label>
                                                    <Form.Control
                                                        onKeyPress={event => blockInvalidChar(event)} {...register(`cargosFields.${index}.cost`, {
                                                        required: "Обов'язкове поле!",
                                                        max: {value: 100000, message: "Макс. знач. 100000!"},
                                                        min: {value: 10, message: "Мінімальне значення 10!"},
                                                        pattern: {
                                                            value: /^[0-9]+$/i,
                                                            message: "Допустимі числові значення!"
                                                        }
                                                    })} size="sm"/>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <span style={{color: "white", fontSize: "12px"}}>грн</span>
                                                </Form.Group>

                                                <Form.Group as={Col} sm={1}>
                                                    <Form.Label style={{fontSize: "10px"}}>Вага</Form.Label>
                                                    <Form.Control
                                                        onKeyPress={event => blockInvalidChar(event)} {...register(`cargosFields.${index}.weight`, {
                                                        required: "Обов'язкове поле!",
                                                        max: {value: 100, message: "Макс. знач. 100!"},
                                                        min: {value: 1, message: "Мінімальне значення 1!"},
                                                        pattern: {
                                                            value: /^[0-9]+$/i,
                                                            message: "Допустимі числові значення!"
                                                        }
                                                    })}
                                                        size="sm"/>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <span style={{color: "white", fontSize: "12px"}}>кг</span>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <Form.Label style={{fontSize: "10px"}}>Довжина</Form.Label>
                                                    <Form.Control
                                                        onKeyPress={event => blockInvalidChar(event)} {...register(`cargosFields.${index}.length`, {
                                                        required: "Обов'язкове поле довжини!",
                                                        max: {value: 300, message: "Макс. значення довжини 300!"},
                                                        min: {value: 5, message: "Мінімальне значення довжини 5!"},
                                                        pattern: {
                                                            value: /^[0-9]+$/i,
                                                            message: "Допустимі числові значення!"
                                                        }
                                                    })}
                                                        size="sm"/>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <Form.Label style={{fontSize: "10px"}}>Ширина</Form.Label>
                                                    <Form.Control
                                                        onKeyPress={event => blockInvalidChar(event)} {...register(`cargosFields.${index}.width`, {
                                                        required: "Обов'язкове поле ширини!",
                                                        max: {value: 300, message: "Макс. значення ширини 300!"},
                                                        min: {value: 5, message: "Мінімальне значення ширини 5!"},
                                                        pattern: {
                                                            value: /^[0-9]+$/i,
                                                            message: "Допустимі числові значення!"
                                                        }
                                                    })}
                                                        size="sm"/>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <Form.Label style={{fontSize: "10px"}}>Висота</Form.Label>
                                                    <Form.Control
                                                        onKeyPress={event => blockInvalidChar(event)} {...register(`cargosFields.${index}.height`, {
                                                        required: "Обов'язкове поле висоти!",
                                                        max: {value: 500, message: "Макс. значення висоти 500!"},
                                                        min: {value: 5, message: "Мінімальне значення висоти 5!"},
                                                        pattern: {
                                                            value: /^[0-9]+$/i,
                                                            message: "Допустимі числові значення!"
                                                        }
                                                    })}
                                                        size="sm"/>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <span style={{color: "white", fontSize: "12px"}}>см</span>
                                                </Form.Group>
                                                <Form.Group as={Col} sm={1}>
                                                    <button style={{width: "50px", height: "50px"}} type="button"
                                                            onClick={() => cargoRemove(index)}>
                                                        X
                                                    </button>
                                                </Form.Group>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <Row className="align-items-center">
                                                <Col sm={2}>
                                                    {errors?.['cargosFields']?.[index]?.['count'] &&
                                                    <p style={{fontSize: "10px"}}
                                                       role="alert">{errors?.['cargosFields']?.[index]?.['count']?.['message']}</p>}
                                                </Col>
                                                <Col sm={2}>
                                                    {errors?.['cargosFields']?.[index]?.['cost'] &&
                                                    <p style={{fontSize: "10px"}}
                                                       role="alert">{errors?.['cargosFields']?.[index]?.['cost']?.['message']}</p>}
                                                </Col>
                                                <Col sm={1}/>
                                                <Col sm={2}>
                                                    {errors?.['cargosFields']?.[index]?.['weight'] &&
                                                    <p style={{fontSize: "10px"}}
                                                       role="alert">{errors?.['cargosFields']?.[index]?.['weight']?.['message']}</p>}
                                                </Col>
                                                <Col sm={1}/>
                                                <Col sm={4}>
                                                    {errors?.['cargosFields']?.[index]?.['length'] &&
                                                    <p style={{fontSize: "10px"}}
                                                       role="alert">{errors?.['cargosFields']?.[index]?.['length']?.['message']}</p>}
                                                    {errors?.['cargosFields']?.[index]?.['width'] &&
                                                    <p style={{fontSize: "10px"}}
                                                       role="alert">{errors?.['cargosFields']?.[index]?.['width']?.['message']}</p>}
                                                    {errors?.['cargosFields']?.[index]?.['height'] &&
                                                    <p style={{fontSize: "10px"}}
                                                       role="alert">{errors?.['cargosFields']?.[index]?.['height']?.['message']}</p>}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </li>
                        )
                    })}
                </ul>
                <button style={{fontSize: "12px"}} type="button"
                        onClick={() => cargoAppend({
                            count: '',
                            cost: '',
                            weight: '',
                            length: '',
                            width: '',
                            height: ''
                        })}>
                    Додати
                </button>
            </div>
        )
    }

    return (

        <Container style={{paddingTop: "200px"}}>
            <Form style={{maxWidth: "800px"}} onSubmit={handleSubmit(onSubmit)}>
                <Row className="align-items-center">
                    <Col sm={4}>
                        <span style={{color: "white"}}>Маршрут</span>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className={"mb-6"}>
                            <Form.Label htmlFor="disabledTextInput">Місто-відправник</Form.Label>
                            <Form.Select {...register("sender")}>
                                <option value={"Вінниця"}>Вінниця</option>
                                <option value={"Дніпро"}>Дніпро</option>
                                <option value={"Харків"}>Харків</option>
                                <option value={"Одеса"}>Одеса</option>
                                <option value={"Житомир"}>Житомир</option>
                                <option value={"Київ"}>Київ</option>
                                <option value={"Львів"}>Львів</option>
                                <option value={"Херсон"}>Херсон</option>
                                <option value={"Кривий ріг"}>Кривий ріг</option>
                                <option value={"Миколаїв"}>Миколаїв</option>
                                <option value={"Запоріжжя"}>Запоріжжя</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className={"mb-6"}>
                            <Form.Label htmlFor="disabledTextInput">Місто-одержувач</Form.Label>
                            <Form.Select {...register("receiver")}>
                                <option value={"Вінниця"}>Вінниця</option>
                                <option value={"Дніпро"}>Дніпро</option>
                                <option value={"Харків"}>Харків</option>
                                <option value={"Одеса"}>Одеса</option>
                                <option value={"Житомир"}>Житомир</option>
                                <option value={"Київ"}>Київ</option>
                                <option value={"Львів"}>Львів</option>
                                <option value={"Херсон"}>Херсон</option>
                                <option value={"Кривий ріг"}>Кривий ріг</option>
                                <option value={"Миколаїв"}>Миколаїв</option>
                                <option value={"Запоріжжя"}>Запоріжжя</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Row className="align-items-center">
                    <Col sm={4}>
                        <span style={{color: "white"}}>Вид відправлення</span>
                    </Col>
                    <Col sm={8}><Form.Group className={"mb-6"}>
                        <Form.Select {...register("type_cargo")}>
                            <option>Вантажі</option>
                            <option onClick={() => setChecked(false)}>Палети</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                <br/>

                {watchShowPallet === "Палети" && Pallet()}
                {watchShowPallet === "Вантажі" && Cargo()}
                <br/>
                <Row className="align-items-center">
                    <Col sm={4}>
                        <span style={{color: "white"}}>Послуга "Пакування"</span>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className={"mb-6"}>
                            <Form.Check style={{checked: checked}} {...register("packing")}/>
                        </Form.Group>
                    </Col>
                </Row>
                {
                    watchShowPacking && PackingPallet()
                }
                <Row className="align-items-center">
                    <Col sm={4}>
                        <span style={{color: "white"}}>Послуга "Підйом на поверх"</span>
                    </Col>
                    <Col sm={2}>
                        <Form.Group className={"mb-6"}>
                            <Form.Control
                                onKeyPress={event => blockInvalidChar(event)} {...register("OnFloor", {
                                required: false,
                                max: {value: 100000, message: "Макс. знач. 100!"},
                                min: {value: 10, message: "Мінімальне значення 1!"},
                                pattern: {value: /^[0-9]+$/i, message: "Допустимі числові значення!"}
                            })} size="sm"/>
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Group>
                            <span style={{color: "white", fontSize: "14px"}}>Кількість поверхів</span>
                        </Form.Group>
                    </Col>
                    <Col sm={1}>
                        <Form.Group>
                            <span style={{color: "white", fontSize: "14px"}}>Ліфт</span>
                        </Form.Group>
                    </Col>
                    <Col sm={1}>
                        <Form.Group className={"mb-6"}>
                            <Form.Check/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm={4}>
                        <span style={{color: "white"}}>Послуга "Зворотня доставка"</span>
                    </Col>
                    <Col sm={4}>
                        <Form.Group className={"mb-6"}>
                            <Form.Check {...register("show_del")}/>
                        </Form.Group>
                    </Col>
                </Row>
                {watchShowDel && (
                    <Row className="align-items-center">
                        <Col sm={4}>
                            <span style={{color: "white"}}>Вид зворотньої доставки</span>
                        </Col>
                        <Col sm={4}>
                            <Form.Group className={"mb-6"}>
                                <Form.Select size="sm" {...register("del_select")}>
                                    <option value={"Документи"}>Документи</option>
                                    <option value={"Грошовий переказ"}>Грошовий переказ</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                )}

                {
                    watchShowTypeDel === "Грошовий переказ" && (
                        <Row className="align-items-center">
                            <Col sm={4}>
                                <span style={{color: "white"}}>Сума</span>
                            </Col>
                            <Col sm={4}>
                                <Form.Group className={"mt-2"}>
                                    <Form.Control
                                        onKeyPress={event => blockInvalidChar(event)} {...register("TypeDelMoney", {
                                        required: "Обов'язкове поле!",
                                        max: {value: 100000, message: "Макс. знач. 100000!"},
                                        min: {value: 10, message: "Мінімальне значення 10!"},
                                        pattern: {value: /^[0-9]+$/i, message: "Допустимі числові значення!"}
                                    })} size="sm"/>
                                </Form.Group>
                            </Col>
                        </Row>
                    )
                }
                <Row>
                    <Col sm={8}>
                        <Button variant="primary" type="submit">
                            Розрахувати вартість
                        </Button>
                    </Col>
                    <Col sm={4}>
                        <Button variant="primary" onClick={() => reset()}>
                            Очистити
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}