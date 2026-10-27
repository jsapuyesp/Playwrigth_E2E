@Author:Juan

Feature: Login swaglabs

  As a user
  I want to log in to the swaglabs application
  to view the products.

  Rule: Customers needs to provide valid credentials to access the site

    Background:
      Given User is on the login page
      |SwaglabsUrl|
      When User attempts to login with the following credentials
        | username      | password     |
        | standard_user | secret_sauce |

    Scenario: Buy Item
      When User selected some item
      Then he can see finalized his purchase
        | Thank you for your order! |

