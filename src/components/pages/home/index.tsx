'use client';
//import { useEffect } from 'react';

export default function Home() {
  /*
        useEffect(() => {
            const endpoint = process.env.NEXT_PUBLIC_OER_CMS_ENDPOINT_POSTS;
            const username = process.env.NEXT_PUBLIC_OER_CMS_BA_USER;
            const password = process.env.NEXT_PUBLIC_OER_CMS_BA_PASS;
            const headers = new Headers();
            headers.append('Authorization', 'Basic' + window.btoa(username + ':' + password));
            const request = new Request(new URL(endpoint), {
            headers,
            method: 'GET',
            mode: 'cors',
            });
            fetch(request)
            .then((response) => {
                console.log(response?.ok);
                return response.json();
            })
      .catch((e) => {
        console.warn(e);
      });
  }, []);
*/
  return (
    <div>
      <header>
        <a href="/" aria-label="click to return to the homepage">
          <h1>OER</h1> {/* TODO hide */}
          <img src="https://www.oertrani.it/images/logo_sito.png" alt="OER's logo" />
        </a>
        <div>
          <ul>
            <li>protezione civile</li>
            <li>servizio ambulanze</li>
            <li>servizio dialisi</li>
            <li>servizio navetta per anziani e disabili</li>
          </ul>
          <ul>
            <li>
              <a href="https://www.facebook.com/oertrani">facebook</a>
            </li>
            <li>
              <a href="https://www.oertrani.it/home/?format=feed&type=rss">RSS</a>
            </li>
          </ul>
        </div>
      </header>
      <nav>
        <a href="/">Home</a>
        <a href="#chi-siamo">chi siamo</a>
        <a href="#statuto">statuto</a>
      </nav>
      <div>
        <aside>
          <div>
            Iscrizione n.1694 registro generale organizzazioni di volontariato Iscrizione al RUNTS
            Nr. 23 del 10/01/2023
          </div>

          <section>
            <h2>Donazioni</h2>
            <div>
              Dona il 5x1000 al 92066360725 o invia la tua donazione a IT19E0306909606100000065180
            </div>
          </section>

          <nav>
            <a href="">HOME</a>
            <a href="">NOTIZIE</a>
            <a href="">EVENTI</a>
            <a href="">SERVIZIO CIVILE</a>
            <a href="">CORSI</a>
            <a href="">FARMACIE DI TURNO</a>
            <a href="">AMMINISTRAZIONE</a>
          </nav>

          <div>
            Questo sito usa i cookie per gestire l'autenticazione, la navigazione e altre
            funzionalità. Usando il nostro sito, dai il consenso a salvare questi cookie sul tuo
            dispositivo.
            <a
              href="https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:32002L0058:IT:NOT"
              rel="nofollow"
              target="_blank"
            >
              Guarda il documento sulla direttiva della privacy
            </a>
            <a
              href="https://eur-lex.europa.eu/legal-content/IT/TXT/HTML/?uri=CELEX:32016R0679"
              rel="nofollow"
              target="_blank"
            >
              View GDPR Documents
            </a>
          </div>

          <section>
            <h3>Links</h3>

            <ul>
              <li>
                <a href="https://www.anpas.org/" target="_blank" rel="nofollow">
                  ANPAS
                </a>
              </li>
              <li>
                <a href="http://www.anpaspuglia.org/" target="_blank" rel="nofollow">
                  ANPAS - PUGLIA
                </a>
              </li>
              <li>
                <a href="https://www.csvbari.com/" target="_blank" rel="nofollow">
                  CSV San Nicola
                </a>
              </li>
              <li>
                <a
                  href="http://www.protezionecivile.puglia.it/bollettino-regionale-criticita"
                  target="_blank"
                  rel="nofollow"
                >
                  PROTEZIONE CIVILE - REGIONE PUGLIA - MESSAGGIO DI ALLERTA
                </a>
              </li>
            </ul>
          </section>
        </aside>
        <main>
          <ol>
            <li>
              <article>
                Pubblicato alle <time dateTime="">DATA E ORA</time>
                da <i>NOME_AUTORE</i>
                <ul>
                  <li>
                    <a href="">Category</a>
                  </li>
                </ul>
                <h2>TITOLO</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </p>
              </article>
            </li>
          </ol>
          {/* Pagination */}
          <nav>
            <a href="">1</a>
          </nav>

          <footer>
            <img src="https://www.oertrani.it/home/images/logo-protezionecivileregionae.png" />

            <section>
              <h3></h3>
              <dl>
                <dt>Adress</dt>
                <dd>via Giuseppe di Vittorio, 47</dd>

                <dt>CF</dt>
                <dd> 92066360725</dd>

                <dt>IBAN</dt>
                <dd>IT19E0306909606100000065180 - Banca Intesa Sanpaolo</dd>

                <dt>Tel./Fax </dt>
                <dd>0883-500600</dd>

                <dt>Cell.</dt>
                <dd>3296036592</dd>
              </dl>
            </section>
            <img src="https://www.oertrani.it/home/images/Logo_anpas.png" />
          </footer>
        </main>
      </div>
    </div>
  );
}
