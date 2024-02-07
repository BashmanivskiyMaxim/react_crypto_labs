import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "./styles.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
const binary = require("decode-encode-binary");

export default function Task1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cipher, setCipher] = useState();
  const [decipher, setDeCipher] = useState("");

  const encryptdecryptBytes = (cipher, key) => {
    console.log("Шифр - " + cipher);
    console.log("Ключ - ", key);
    let encryptedBytes = "";
    for (let i = 0; i < cipher.length; ++i) {
      encryptedBytes += cipher[i] ^ key[i];
    }
    console.log("Результат додавання за модулем 2 - ", encryptedBytes.toString());
    return binary.decode(encryptedBytes.toString());
  };

  const onSubmitCipher = (data) =>
    setCipher(encryptdecryptBytes(binary.encode(data.textCipher), data.key));
  const onSubmitDeCipher = (data) =>
    setDeCipher(
      encryptdecryptBytes(binary.encode(data.ciphertext), data.keyde)
    );

  return (
    <Row className="justify-content-md-center">
      <Col xs lg="2" style={{ margin: "50px 50px 50px 50px" }}>
        <form onSubmit={handleSubmit(onSubmitCipher)}>
          <label>Шифрування:</label>
          <textarea {...register("textCipher", {})} />
          <input
            {...register("key", {})}
            style={{ width: "221.6667px", height: "31px" }}
          />
          <label>Результат шифрування:</label>
          <textarea readOnly={true} value={cipher}></textarea>
          <Button type="submit">зашифрувати</Button>
        </form>
      </Col>
      <Col xs lg="2" style={{ margin: "50px 50px 50px 50px" }}>
        <form onSubmit={handleSubmit(onSubmitDeCipher)}>
          <label>Розшифрування:</label>
          <textarea {...register("ciphertext", {})} />
          <input
            {...register("keyde", {})}
            style={{ width: "221.6667px", height: "31px" }}
          />
          <label>Результат розшифрування:</label>
          <textarea readOnly={true} value={decipher}></textarea>
          <Button type="submit">розшифрувати</Button>
        </form>
      </Col>
    </Row>
  );
}
