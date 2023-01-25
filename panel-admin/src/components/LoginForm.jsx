import React, { useState } from 'react';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        // Vérifiez les informations de connexion ici
        console.log(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom d'utilisateur :
            </label>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <label>
                Mot de passe :
            </label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
         
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default LoginForm;