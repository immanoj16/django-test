from django.test import TestCase
from .models import Expenses
from django.contrib.auth.models import User


class ModelTestCase(TestCase):
    """This class defines the test suite for the expenses model."""

    def setUp(self):
        """Define the test client and other test variables."""
        user = User.objects.create(username="nerd")
        self.name = "Sprite"
        # specify owner of a expenselist
        self.expenses = Expenses(name=self.name, owner=user)

    def test_model_can_create_a_expenselist(self):
        """Test the expenses model can create a expense."""
        old_count = Expenses.objects.count()
        self.expenses.save()
        new_count = Expenses.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_model_returns_readable_representation(self):
        """Test a readable string is returned for the model instance."""
        self.assertEqual(str(self.expenses), self.name)
