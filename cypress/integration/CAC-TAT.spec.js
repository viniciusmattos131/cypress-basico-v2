/// <reference types="Cypress" />

    describe('Central de Atendimento ao Cliente TAT', function() {
        beforeEach( function() {
            cy.visit('./src/index.html'); 
        })

            it('verifica o título da aplicação', function() {
                cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
            })

            it('preenche os campos obrigatórios e envia o formulário', function() {
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

            it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
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
                 .type('teste@gmail,com')
                 //Informando o campo "Como podemos te ajudar?"
                 cy.get('#open-text-area')
                 .click()
                 .type('Teste', {delay: 0})
                 //Clicando no botão "Enviar"
                 cy.get('.button')
                 .click()
                 cy.get('.error').should('be.visible') 
            })
        
            it('Verifica só números no campo telefone', function(){
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
                 .type('teste@gmail,com')
                 //Informando o campo "telefone"
                 cy.get('#phone')
                 .click()
                 .type('Testando')
                 .should('be.empty')
                 //Informando o campo "Como podemos te ajudar?"
                 cy.get('#open-text-area')
                 .click()
                 .type('Teste', {delay: 0})
                 //Clicando no botão "Enviar"
                 cy.get('.button')
                 .click()
                 cy.get('.error').should('be.visible')
            })

            it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
                cy.get('#phone')
                    .type('abcdefghij')
                    .should('have.value', '')
            })

            it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
                cy.get('#firstName').type('Walmyr')
                cy.get('#lastName').type('Filho')
                cy.get('#email').type('walmyr@exemplo.com')
                //Clicando no checkbox do telefone
                cy.get('#phone-checkbox').check()
                cy.get('#open-text-area').type('Teste')
                //Clicando no botão "Enviar"
                cy.contains('button', 'Enviar').click()
                //Verificando se exibe a mensagem de erro
                cy.get('.error').should('be.visible')
            })

            it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
                //Informando o campo "Nome"
                cy.get('#firstName')
                    .type('Nome')
                    .should('have.value', 'Nome')
                    .clear()
                    .should('have.value', '')
                //Informando o campo "Sobrenome"
                cy.get('#lastName')
                    .type('SobreNome')
                    .should('have.value', 'SobreNome')
                    .clear()
                    .should('have.value', '')
                //Informando o campo "Email"
                cy.get('#email')
                    .type('email@gmail.com')
                    .should('have.value', 'email@gmail.com')
                    .clear()
                    .should('have.value', '')
                //Informando o campo "telefone"
                cy.get('#phone')
                    .type('31988776655')
                    .should('have.value', '31988776655')
                    .clear()
                    .should('have.value', '')
            })

            it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
                //Clicando no botão "Enviar"
                cy.contains('button', 'Enviar')
                    .click()
                cy.get('.error').should('be.visible')
            })

            it('envia o formulário com sucesso usando um comando customizado', function() {
                cy.fillMandatoryFieldsAndSubmit()
                
                cy.get('.success').should('be.visible')
            })

            it('seleciona um produto (Youtube) por seu texto', function(){
                cy.get('#product')
                    .select('YouTube')
                    .should('have.value', 'youtube')
            })

            it('seleciona um produto (Mentoria) por seu valor (value)', function (){
                cy.get('#product')
                .select('mentoria')
                .should('have.value', 'mentoria')
            })

            it('seleciona um produto (Blog) por seu índice', function(){
                cy.get('#product')
                .select(1)
                .should('have.value', 'blog')            
            })

            it('marca o tipo de atendimento "Feedback"', function(){
                cy.get('input[type="radio"][value="feedback"]')
                    .check()
                    .should('have.value', 'feedback')
            })

            it('marca cada tipo de atendimento', function(){
                cy.get('input[type="radio"]')
                    .should('have.length', 3)
                    .each(function($radio){
                        cy.wrap($radio).check()
                        cy.wrap($radio).should('be.checked')
                    })
                    
            })

            it('marca ambos checkboxes, depois desmarca o último', function(){
                cy.get('input[type="checkbox"]')
                    .check()
                    .should('be.checked')
                    .last()
                    .uncheck()
                    .should('not.be.checked')
            })

            it('seleciona um arquivo da pasta fixtures', function(){
                cy.get('input[type="file"]')
                    .should('not.have.value')
                    .selectFile('./cypress/fixtures/example.json')
                    .should(function($input){
                        console.log($input)
                        expect($input[0].files[0].name).to.equal('example.json')
                    })
            })

            it('seleciona um arquivo simulando um drag-and-drop', function(){
                cy.get('input[type="file"]')
                    .should('not.have.value')
                    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
                    .should(function($input){
                        console.log($input)
                        expect($input[0].files[0].name).to.equal('example.json')
                    })
            })

            it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
                cy.fixture('example.json').as('sampleFile')
                cy.get('input[type="file"]')
                    .selectFile('@sampleFile')
                    .should(function($input){
                        console.log($input)
                        expect($input[0].files[0].name).to.equal('example.json')
                    })
            })

            it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
                cy.get('#privacy a').should('have.attr', 'target', '_blank')
            })

            it('acessa a página da política de privacidade removendo o target e então clica no link', function(){
                cy.get('#privacy a')
                    .invoke('removeAttr', 'target')
                    .click()
                cy.contains('Talking About Testing').should('be.visible')
            })




    })



