import Table from "react-bootstrap/Table";
import "./styles.css";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
/* global BigInt */

export default function Task2() {
  const [cipher, setCipher] = useState("0");
  const [decipher, setDeCipher] = useState("0");

  function decryptElgamal(encryption, x, p) {
    const { en_msg, a } = encryption;

    let h = power(a, p - 1n - x, p);
    let dr_msg = en_msg * h;
    return dr_msg % p;
  }

  function encryptElgamal(msg, p, y, g, k) {
    let a = power(g, k, p);
    let en_msg = power(y, k, p, msg);

    console.log("a - ", a);
    console.log("b - ", en_msg);

    return { en_msg, a };
  }

  function power(a, b, c, msgVal) {
    let x = 1n;
    let y = a;

    while (b > 0n) {
      if (b % 2n !== 0n) x = (x * y) % c;
      y = (y * y) % c;
      b = b / 2n;
    }

    if (msgVal) {
      x = (x * msgVal) % c;
    }

    return x % c;
  }

  function elgamalExample() {
    const msg = 13n; //13n
    const p = 2143n; //11n //2143
    const g = 7n; //generator 7n
    const x = 5n; //private key 5n
    const k = 6n; //6n
    const y = power(g, x, p);
    console.log("y - ", y)

    let en_msg = encryptElgamal(msg, p, y, g, k);
    let decryptMessage = decryptElgamal(en_msg, x, p);

    console.log(en_msg);
    console.log(decryptMessage);

    const a = en_msg.a;
    const b = en_msg.en_msg;
    console.log(en_msg);

    setCipher("(" + a.toString() + "," + b.toString() + ")");
    setDeCipher(decryptMessage.toString());
  }

  //elgamalExample();

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <tbody>
          <thead>
            <tr>
              <th width={"10%"}>ELgamal - шифрування</th>
            </tr>
          </thead>
          <tr>
            <td>p</td>
            <td>2143</td>
          </tr>
          <tr>
            <td>g</td>
            <td>7</td>
          </tr>
          <tr>
            <td>x</td>
            <td>5</td>
          </tr>
          <tr>
            <td>k</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Інформація</td>
            <td>13</td>
          </tr>
          <tr>
            <td>Зашифрування:</td>
            <td>{cipher}</td>
          </tr>
          <tr>
            <td>Розшифрування:</td>
            <td>{decipher}</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => elgamalExample()}>
        Порахувати
      </Button>
    </div>
  );
}
