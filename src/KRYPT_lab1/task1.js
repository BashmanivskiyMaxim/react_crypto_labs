import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "./styles.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";

export default function Task1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cipher, setCipher] = useState();
  const [decipher, setDeCipher] = useState("");

  function caesarCipher(data, cipher) {
    let resultArray = [];

    if (cipher === true) {
      for (let i = 0; i < data.textCipher.length; i++) {
        console.log(data);
        data.textCipher = data.textCipher.toString().toLowerCase();
        let code = "";
        if (data.textCipher.charCodeAt(i) === 32) {
          code = 32;
        } else {
          code = data.textCipher.charCodeAt(i) + parseInt(data.rotateCipher);
        }
        while (code > 122) {
          code = code - 122 + 96;
        }
        while (code < 97 && code > 90) {
          code += 6;
        }

        resultArray.push(String.fromCharCode(code));
      }
    } else {
      for (let i = 0; i < data.textDeCipher.length; i++) {
        data.textDeCipher = data.textDeCipher.toString().toLowerCase();
        let code = "";

        code = data.textDeCipher.charCodeAt(i) - parseInt(data.rotateDeCipher);

        while (code < 97) {
          code = code + 122 - 96;
        }
        if (data.textDeCipher.charCodeAt(i) === 32) {
          code = 32;
          console.log(code);
        }
        resultArray.push(String.fromCharCode(code));
      }
    }
    return resultArray.join("");
  }

  const onSubmitCipher = (data) => setCipher(caesarCipher(data, true));
  const onSubmitDeCipher = (data) => setDeCipher(caesarCipher(data, false));

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="2" style={{ margin: "50px 50px 50px 50px" }}>
        <form onSubmit={handleSubmit(onSubmitCipher)}>
          <label>Шифрування:</label>
          <textarea {...register("textCipher", {})} />
          <input
            {...register("rotateCipher", {})}
            style={{ width: "68.6667px", height: "31px" }}
            type={"number"}
          />
          <label>Результат шифрування:</label>
          <textarea readOnly={true} value={cipher}></textarea>
          <Button type="submit">зашифрувати</Button>
        </form>
      </Col>
      <Col xs lg="2" style={{ margin: "50px 50px 50px 50px" }}>
        <form onSubmit={handleSubmit(onSubmitDeCipher)}>
          <label>Розшифрування:</label>
          <textarea {...register("textDeCipher", {})} />
          <input
            {...register("rotateDeCipher", {})}
            style={{ width: "68.6667px", height: "31px" }}
            type={"number"}
          />
          <label>Результат розшифрування:</label>
          <textarea readOnly={true} value={decipher}></textarea>
          <Button type="submit">розшифрувати</Button>
        </form>
      </Col>
    </Row>
  );
}
