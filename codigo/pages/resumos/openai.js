const API_KEY = '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';

async function getCompletion(prompt){
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-instruct",
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 4000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch: ', error);
    }
}

document.querySelector('.gerar-resumo').addEventListener('click', async () => {
    const tituloInput = document.querySelector('.insira-titulo');
    const resumoTextarea = document.querySelector('.insira-resumo');

    if (!tituloInput.value.trim()) {
        alert('Insira o Tema');
        return;
    }

    const response = await getCompletion(tituloInput.value);
    if (response && response.choices && response.choices.length > 0) {
        resumoTextarea.value = response.choices[0].text;
    } else {
        resumoTextarea.value = 'Não foi possível gerar o texto.';
    }

    const salvarBtn = document.querySelector('.salvar-resumo');
    salvarBtn.style.display = 'inline';
});

document.addEventListener('DOMContentLoaded', () => {
    const salvarBtn = document.querySelector('.salvar-resumo');
    salvarBtn.addEventListener('click', salvarResumoHandler);
});

function salvarResumoHandler() {
    const tituloInput = document.querySelector('.insira-titulo');
    const resumoTextarea = document.querySelector('.insira-resumo');
    salvarResumoGerado(tituloInput.value, resumoTextarea.value);
}

console.log(getCompletion(''));