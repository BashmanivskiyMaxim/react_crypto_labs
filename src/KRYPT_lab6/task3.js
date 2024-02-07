import Table from "react-bootstrap/Table";
import "./styles.css";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
/* global BigInt */

export default function Task3() {
  const [cipherA, setCipherA] = useState("0");
  const [cipherB, setCipherB] = useState("0");
  const [decipherA, setDecipherA] = useState("0");
  const [decipherB, setDecipherB] = useState("0");

  function power(a, b, c) {
    let x = 1n;
    let y = a;

    while (b > 0n) {
      if (b % 2n !== 0n) x = (x * y) % c;
      y = (y * y) % c;
      b = b / 2n;
    }

    return x % c;
  }

  function DiffieHellmanExample() {
    const p = 11n;
    const g = 7n;
    const x = 6n;
    const y = 8n;

    const xa = power(g, x, p);
    const yb = power(g, y, p);

    let ka = power(yb, x, p);
    let kb = power(xa, y, p);

    setCipherA(xa.toString())
    setCipherB(yb.toString())

    setDecipherA(ka.toString())
    setDecipherB(kb.toString())

  }

  //DiffieHellmanExample();

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <tbody>
          <thead>
            <tr>
              <th width={"10%"}>Алгоритм обміну ключами Діффі-Хеллмана</th>
            </tr>
          </thead>
          <tr>
            <td>p</td>
            <td>11</td>
          </tr>
          <tr>
            <td>g</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Абонент A</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Абонент B</td>
            <td>8</td>
          </tr>
          <tr>
            <td>xA:</td>
            <td>{cipherA}</td>
          </tr>
          <tr>
            <td>yB:</td>
            <td>{cipherB}</td>
          </tr>
          <tr>
            <td>kA:</td>
            <td>{decipherA}</td>
          </tr>
          <tr>
            <td>kB:</td>
            <td>{decipherB}</td>
          </tr>
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => DiffieHellmanExample()}>
        Порахувати
      </Button>
    </div>
  );
}
