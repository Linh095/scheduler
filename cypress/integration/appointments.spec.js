describe("Navigation", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get('section>article').eq(1)
      .find("[alt=Add]")
      .click()

    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // Clicks the save button
    cy.contains("Save").click()

    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // sits the root of our web server
    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]").click({ force: true })
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Linh Nguyen");
    cy.get("[alt='Tori Malcolm']").click();
    // Clicks the save button
    cy.contains("Save").click()

    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Linh Nguyen");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Visits the root of our web server
    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

    // Clicks the confirm button
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");

    // Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});