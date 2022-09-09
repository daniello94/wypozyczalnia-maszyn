import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import Container from "../components/Container";
import Button from "../components/Button";
import Error from "../components/Error";

export default function Contact(props) {
    const form = useRef()
    const [userName ,setUserName]= useState(props.dataUser?.user.name);
    const [userEmail ,setUserEmial]= useState(props.dataUser?.user.email);
    const [userLastName ,setUserLastName]= useState(props.dataUser?.user.email);
    const [error , setError]= useState('')
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_e8ekzxt', 'template_znu6xbk', form.current, 'xd7uD2N9qzKDXYcig')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
          setError(<Error isAlternative={true}>Wiadomośc została wysłana</Error>)
      };
    
    return (
        <Container>
            <span>{error}</span>
            <h2> Napisz do nas</h2>
            <form ref={form} onSubmit={sendEmail}>
                <input type="text" name="user_name" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="Wpisz swoje imię" />
                <input type="email" name="user_email" value={userEmail} onChange={(e)=>setUserEmial(e.target.value)} placeholder="Wpisz swó email" />
                <input type="text" name="user_last_name" value={userLastName} onChange={(e)=>setUserLastName(e.target.value)} placeholder="Wpisz swoje nazwisko" />
                <textarea name="message" placeholder="wpisz swoja wiadość" />
                <Button type="submit">Wyślij</Button>
            </form>
        </Container>
    )
}