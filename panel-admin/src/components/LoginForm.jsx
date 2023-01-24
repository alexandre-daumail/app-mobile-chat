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
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Mot de passe :
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default LoginForm;