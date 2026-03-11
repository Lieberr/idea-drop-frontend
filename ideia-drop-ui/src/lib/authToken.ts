let accessToken: string | null = null;

// Definir token
export const setStoredAcessToken = (token: string | null) => {
    accessToken = token;
}

// Pegar token
export const getStoredAccessToken = () => accessToken;


// Qualquer arquivo que importa estas funções podem
// acessar o token


// Normalmente usando em axios interceptor