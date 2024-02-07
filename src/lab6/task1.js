import {useForm} from "react-hook-form";
//import "./styles.css"


export default function Task1Form() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = data => {
        console.log(data);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder={"Ім'я"}  {...register("name")} />

            <input placeholder={"E-mail*"} {...register("email", {
                required: true,
                pattern: {
                    value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                    message: "Помилка валідації"
                }
            })} aria-invalid={errors.email ? "true" : "false"}/>
            {errors.email?.type === 'required' && <span style={{color: "white"}}>Поле обов'язкове</span>}
            {errors.email?.type === 'pattern' &&
            <span style={{color: "white"}}>Адресу електронної пошти введено неправильно.</span>}

            <input placeholder={"Тема*"} {...register("topic", {required: true})}/>
            {errors.topic && <span style={{color: "white"}}>Поле обов'язкове</span>}

            <textarea style={{fontSize: "14px"}} rows={"4"} cols={"78"} placeholder={"Повідомлення"} {...register("message", {})} />

            <span style={{color: "white", fontStyle: "italic"}}>Поля відмічені * мають бути обов'язково заповненими</span>

            <input type="submit"/>
        </form>
    );
}