import express from 'express';
import mysql from 'mysql';
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser';
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware za parsiranje JSON podataka, jer pravimo express aplikaciju
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); 

//KONEKCIJA S BAZOM
const db = mysql.createConnection({ 
  //unosimo podatke iz baze koju smo prethodno napravili
  //kroz MySql Workbench
    host:"localhost",
    user:"root",
    password:"hisoka",
    database: "book_a_look_db"
})

//DODAVANJE KORISNIKA
app.post("/users", async (req, res) => {
  try {
    const { ime, prezime, email, password, uloga } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const q = "INSERT INTO korisnici (ime, prezime, email, password, uloga) VALUES (?, ?, ?, ?, ?)";
    const values = [ime, prezime, email, hashedPassword, uloga];
  
    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Greška prilikom dodavanja korisnika:", err);
        return res.status(500).json({ error: "Greška prilikom dodavanja korisnika" });
      }
      return res.json({ message: "Korisnik uspješno dodat." });
    });
  } catch (error) {
    console.error("Greška prilikom dodavanja korisnika:", error);
    res.status(500).json({ error: "Greška prilikom dodavanja korisnika" });
  }
});

//DODAVANJE SALONA
app.post('/saloni', (req, res) => {
  const { ime, grad, adresa, tel, email } = req.body;

  const query = "INSERT INTO saloni (naziv, grad, adresa, tel, email) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [ime, grad, adresa, tel, email], (err, result) => {
      if (err) 
        {
          console.error('Greška pri dodavanju salona: ', err);
          return res.status(500).json({ error: 'Greška pri dodavanju salona.' });
      }
      res.status(200).json({ message: 'Salon uspješno dodat', salonId: result.insertId });
  });
});
  
//DOHVATANJE IMENA GRADOVA
app.get("/gradovi", (req, res) => {
  const q = "SELECT naziv FROM gradovi";
  db.query(q, (err, results) => {
      
    if (err) 
      {
          console.error("Greška prilikom dohvatanja gradova: ", err);
          return res.status(500).json({ error: "Greška prilikom dohvatanja gradova." });
      }
      const gradovi = results.map(row => row.naziv);
      return res.json(gradovi);
  });
});

//DOHVATANJE IMENA USLUGA
app.get("/usluge", (req, res) => {
  const q = "SELECT naziv FROM usluge";
  db.query(q, (err, results) => {
      if (err) {
          console.error("Greška prilikom dohvatanja usluga: ", err);
          return res.status(500).json({ error: "Greška prilikom dohvatanja usluga." });
      }
      const usluge = results.map(row => row.naziv);
      return res.json(usluge);
  });
});

//DODAVANJE U SALON_USLUGA
app.post('/salon_usluga', (req, res) => {
  const { salon, usluge } = req.body; //predajemo naslov salona, a ne id

  const query = "INSERT INTO salon_usluga (salon, usluga, cijena) VALUES ?";
  const values = usluge.map(usluga => [salon, usluga.naziv, usluga.cijena]);

  db.query(query, [values], (err) => {
      if (err) {
          console.error('Greška prilikom unošenja usluge: ', err);
          return res.status(500).json({ error: 'Greška prilikom unošenja usluge.' });
      }
      res.status(200).json({ message: 'Usluge uspješno dodate.' });
  });
});

//PRIKAZ SALONA
app.get('/saloni', (req, res) => {
  const query = "SELECT * FROM saloni";
  db.query(query, (err, results) => {
    if (err) {
      console.error('Greška pri dohvatanju salona: ', err);
      return res.status(500).json({ error: 'Greška pri dohvatanju salona.' });
    }
    res.json(results);
  });
});

//PRIKAZ SALON_USLUGA
app.get('/salon_usluga', (req, res) => {
  const query = "SELECT * FROM salon_usluga";
  db.query(query, (err, results) => {
      if (err) {
          console.error('Greška pri dohvatanju usluge: ', err);
          return res.status(500).json({ error: 'Greška pri dohvatanju usluge.' });
      }
      res.json(results);
  });
});

//AŽURIRANJE SALONA
app.put('/saloni/:naziv', (req, res) => {
  const { naziv } = req.params;
  const { grad, adresa, tel, email } = req.body;

  const query = "UPDATE saloni SET  grad = ?, adresa = ?, tel = ?, email = ? WHERE naziv = ?";
  const values = [ grad, adresa, tel, email, naziv];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Greška prilikom ažuriranja podataka o salonu: ', err);
      return res.status(500).json({ error: 'Greška prilikom ažuriranja podataka o salonu.' });
    }
    res.status(200).json({ message: 'Podaci o salonu uspješno ažurirani' });
  });
});

//BRISANJE SALONA
app.delete('/saloni/:naziv', (req, res) => {
  const { naziv } = req.params;

  const query = "DELETE FROM saloni WHERE naziv = ?";
  db.query(query, [naziv], (err, result) => {
    if (err) {
      console.error('Greška prilikom brisanja salona: ', err);
      return res.status(500).json({ error: 'Greška prilikom brisanja salona.' });
    }
    res.status(200).json({ message: 'Salon uspješno obrisan.' });
  });
});

//BRISANJE SALON_USLUGA
app.delete('/salon_usluga/:id', (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM salon_usluga WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Greška prilikom brisanja usluge iz salon_usluga: ', err);
      return res.status(500).json({ error: 'Greška prilikom brisanja usluge iz salon_usluga.' });
    }
    res.status(200).json({ message: 'Usluga uspješno obrisana iz salon_usluga.' });
  });
});

//DOHVATANJE SALONA PO NAZIVU
app.get('/saloni/:naziv', (req, res) => {
  const { naziv } = req.params;

  const query = "SELECT * FROM saloni WHERE naziv = ?";
  db.query(query, [naziv], (err, results) => {
    if (err) {
      console.error('Greška prilikom dohvatanja podataka o salonu: ', err);
      return res.status(500).json({ error: 'Greška prilikom dohvatanja podataka o salonu.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Salon nije pronađen.' });
    }
    res.status(200).json(results[0]);
  });
});

//SIGN UP
app.post('/signup', async (req, res) => {
  try {
    const q = "INSERT INTO korisnici (`ime`, `prezime`, `email`, `lozinka`, `uloga`) VALUES (?, ?, ?, ?, ?)";

    const values = [
      req.body.name,
      req.body.lastname,
      req.body.email,
      req.body.password, //koristimo neheširanu lozinku
      req.body.email === ('nikolinatod15@gmail.com' || 'jovicevicmilica72@gmail.com') ? 'admin' : 'user'
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Greška prilikom čuvanja korisnika." });
      }
      return res.json({ message: "Korisnik uspješno dodat." });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM korisnici WHERE email = ?";

  db.query(q, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Greška prilikom pretraživanja baze.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Pogrešan email ili lozinka.' });
    }

    const user = results[0];

    //upoređivanje neheširane lozinke
    if (password !== user.lozinka) {
      return res.status(400).json({ error: 'Pogrešan email ili lozinka.' });
    }

    //generisanje JWT tokena
    const token = jwt.sign({ email: user.email, role: user.uloga }, 'tajna_tajna_tajna', { expiresIn: '1h' });
    res.json({ token });
  });
});

//SLANJE E-MAILA
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
 
  //konfigurišemo transporter za slanje mail-a
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'todorovicn69@gmail.com', //email na koji se šalje
      pass: 'teai tkaz ftmi ddhv' //elozinka za email, ali generisana kao lozinka za aplikaciju
    }
  });
 
  const mailOptions = {
    from: email, //email pošiljaoca
    to: 'todorovicn69@gmail.com', //email na koji se šalje
    subject: 'Poruka sa Book-a-Look web-stranice',
    html: `<p>Ime pošiljaoca: ${name}</p><p>Email pošiljaoca: ${email}</p><p>Poruka: ${message}</p>`
  };
 
  //slanje e-maila
  transporter.sendMail(mailOptions, (error, info) => {
    if (error)
    {
      console.error('Greška prilikom slanja emaila:', error);
      res.status(500).send('Došlo je do greške prilikom slanja emaila.');
    } 
    else 
    {
      console.log('Email uspješno poslat:', info.response);
      res.status(200).send('Email uspješno poslat.');
    }
   });
});

//PROFIL KORISNIKA
app.post('/get-user-info', (req, res) => {
  const email = req.body.email;
  const q = "SELECT ime, prezime, email FROM korisnici WHERE email = ?";

  db.query(q, [email], (err, data) => {
    if (err) 
      {
      return res.status(500).json("Greška prilikom dohvatanja korisničkih informacija.");
    }

    if (data.length > 0) 
    {
      return res.json(data[0]); //jedinstveni email korisnika
    }

    else 
    {
      return res.status(404).json("Korisnik nije pronađen.");
    }
  });
});

//PRIKAZ KORISNIKA
app.get("/users", (req, res) => {
  const q = "SELECT id, ime, prezime, email FROM korisnici WHERE uloga != 'admin'";
  db.query(q, (err, data) => {
    if (err) 
      {
      return res.status(500).json("Greška prilikom dohvatanja korisničkih informacija.");
      }
    return res.json(data);
  });
});

//BRISANJE KORISNIKA
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  const query = "DELETE FROM korisnici WHERE id = ?";
  db.query(query, [userId], (error, result) => {
    if (error) {
      console.error("Greška prilikom brisanja korisnika iz baze: ", error);
      return res.status(500).json({ error: "Greška prilikom brisanja korisnika iz baze." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Korisnik sa datim ID-om nije pronađen." });
    }

    return res.status(200).json({ message: "Korisnik uspješno obrisan." });
  });
});

//ZAKAZIVANJE, DODAVANJE TRETMANA U BAZU
app.post("/treatments", (req, res) => {
  const { email, salon, usluga, cijena, datum, vrijeme } = req.body;

  const q = "INSERT INTO zakazani_tretmani (korisnik, salon, usluga, datum, vrijeme) VALUES (?, ?, ?, ?, ?)";
  const values = [email, salon, usluga, datum, vrijeme];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Greška prilikom dodavanja zakazanog tretmana: ", err);
      return res.status(500).json({ error: "Greška prilikom dodavanja zakazanog tretmana." });
    }
    return res.json({ message: "Tretman uspješno dodat." });
  });
});

//DOHVATANJE USLUGA ZA KONKRETAN SALON
app.get('/salon_usluge/:naziv', (req, res) => {
  const { naziv } = req.params;

  const query = "SELECT * FROM salon_usluga WHERE salon = ?";
  db.query(query, [naziv], (err, results) => {
    if (err) {
      console.error('Greška prilikom dohvatanja usluga za salon: ', err);
      return res.status(500).json({ error: 'Greška prilikom dohvatanja usluga za salon.' });
    }
    res.json(results);
  });
});

//DOHVATANJE TRETMANA ZA KORISNIKA
app.post("/user-treatments", (req, res) => {
  const { email } = req.body;

  const q = "SELECT * FROM zakazani_tretmani WHERE korisnik = ?";
  db.query(q, [email], (err, results) => {
    if (err) {
      console.error("Greška prilikom dohvatanja zakazanih tretmana korisnika: ", err);
      return res.status(500).json({ error: "Greška prilikom dohvatanja zakazanih tretmana korisnika." });
    }
    return res.json(results);
  });
});

//DOHVATANJE ZAKAZANIH TRETMANA
app.get("/treatments", (req, res) => {
  const q = "SELECT * FROM zakazani_tretmani";

  db.query(q, (err, results) => {
    if (err) {
      console.error("Greška prilikom dohvatanja zakazanih tretmana:", err);
      return res.status(500).json({ error: "Greška prilikom dohvatanja zakazanih tretmana" });
    }
    return res.json(results);
  });
});

//BRISANJE TRETMANA
app.delete("/treatments/:id", (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM zakazani_tretmani WHERE id = ?";

  db.query(q, [id], (err, result) => {
    if (err) {
      console.error("Greška prilikom brisanja zakazanog tretmana: ", err);
      return res.status(500).json({ error: "Greška prilikom brisanja zakazanog tretmana." });
    }
    return res.json({ message: "Tretman uspješno obrisan." });
  });
});

//POKRETANJE SERVERA!
app.listen(PORT, () => {
  console.log(`Uspješno konektovano na backend, na portu ${PORT}.`);
});
