import { useState } from "react";
import Reveal from "@/components/ui/Reveal/Reveal";
import { isEmail } from "@/lib/validation";
import Sello from "./Sello";
import "./Cartas.css";

export default function Cartas() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setMsg({ kind: "error", text: "Escribe un correo válido, por ejemplo nombre@correo.com" });
      return;
    }
    setMsg({ kind: "ok", text: "Listo. Te escribiremos cuando salga una nueva serie del taller." });
    setEmail("");
  };
  return (
    <section id="cartas" className="sec letters">
      <div className="wrap">
        <Reveal className="postal">
          <div className="postal-msg">
            <h2 className="sec-title">Cartas desde el atelier</h2>
            <p className="sec-intro">
              Una carta al mes con las nuevas series antes de que se agoten y alguna historia del taller. Sin prisa, como
              todo lo que hacemos.
            </p>
            <p className="letter-sign">Te esperamos en el buzón</p>
          </div>
          <div className="postal-side">
            <Sello />
            <form className="postal-form" onSubmit={submit} noValidate>
              <label htmlFor="carta-email">Tu dirección de correo</label>
              <input
                id="carta-email"
                type="email"
                className="input"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setMsg(null); }}
                aria-invalid={msg?.kind === "error"}
                aria-describedby="carta-msg"
              />
              <button className="btn btn-solid" type="submit">Recibir las cartas</button>
            </form>
            <p id="carta-msg" className="form-msg" data-kind={msg?.kind} role="status">{msg?.text}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
