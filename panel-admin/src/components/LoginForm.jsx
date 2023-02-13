import React, { useState } from 'react';
import SCLogo from "../assets/images/simplechat.png";
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        // Vérifiez les informations de connexion ici
        console.log(email, password);

        // Envoyer une requête à l'API pour vérifier les informations d'identification
        fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    // Si la connexion a échoué, afficher un message d'erreur
                    setError(data.error);
                } else {
                    // Si la connexion a réussi, enregistrer l'utilisateur et rediriger vers la page d'accueil
                    localStorage.setItem('user', JSON.stringify(data.user));

                    window.location.href = '/admin/all-users';

                }
            })
            .catch(error => {
                // Gérer les erreurs de requête
                setError('Une erreur s\'est produite lors de la connexion.');
            });
    }
    console.log(localStorage.user)
    return (

        <div className="App-header">
            <div className="Login-Card">
                <img src={SCLogo} width={'20%'}  alt='SimpleChat'/>
                <h4> PANEL ADMIN</h4>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                    </label>
                    <input type="email" placeholder="Votre email" onChange={e => setEmail(e.target.value)} autoComplete="username"/>

                    <label>
                        Mot de passe :
                    </label>
                    <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} autoComplete="current-password" />

                    {error && <p style={{color: 'red', fontSize:'small'}}>{error}</p>}

                    <button type="submit" >Se connecter</button>
                </form>
            </div>

        </div>

    );
    }

    export default LoginForm