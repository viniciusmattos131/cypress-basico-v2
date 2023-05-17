Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste';
                //Informando o campo "Nome"
                cy.get('#firstName')
                .click()
                .type('Teste')
                //Informando o campo "Sobrenome"
                cy.get('#lastName')
                .click()
                .type('Sobrenome Teste')
                //Informando o campo "Email"
                cy.get('#email')
                .click()
                .type('teste@gmail.com')
                //Informando o campo "Como podemos te ajudar?"
                cy.get('#open-text-area')
                .click()
                .type(longText, {delay: 0})
                //Clicando no botão "Enviar"
                cy.get('.button')
                .click()
                //Verificando se a solicitação foi enviada com sucesso
                cy.get('.success').should('be.visible')
                cy.get('.success > strong').should('have.text', 'Mensagem enviada com sucesso.')
})