describe('test tusk', () => {
  it('passes', () => {
    cy.visit('https://forhemer.github.io/React-Todo-List/') // загружаем приложение

    // добавляем 3 todo
    for (let i = 0; i < 3; i++) {
      cy.get('.input-text').type(`Text ${i}{enter}`)
    }
    // проверяем, что добавлено 3 элемента в список
    cy.get('ul').find('li').should('have.length', 3) 

    // активируем checkbox первого элемента
    cy.get('.TodoItem_checkbox__Tf0FQ')
    .eq(0).check().should('be.checked')
    
    // проверяем, что текст перечеркнут
    cy.get('ul')
      .find('li')
      .eq(0)
      .find('span')
      .should('have.css', 'text-decoration')
      .and('match', /line-through/)

    // удаляем первый элемент, который содержит текст Text 0
    cy.get('ul')
      .find('li')
      .contains('Text 0')
      .parent()
      .within(($li) => {
        cy.wrap($li).find('button').click()
      })

    // проверяем, что элемент удален
    cy.get('ul').find('li').contains('Text 0').should('not.exist')
  })
})
