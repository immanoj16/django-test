from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
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


class ViewsTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        user = User.objects.create(username="nerd")

        # Initialize client and force it to use authentication
        self.client = APIClient()
        self.client.force_authenticate(user=user)

        # Since user model instance is not serializable, use its Id/PK
        self.bucketlist_data = {'name': 'Sprite', 'owner': user.id}
        self.response = self.client.post(
            reverse('create'),
            self.bucketlist_data,
            format="json")

    def test_api_can_create_a_bucketlist(self):
        """Test the api has expense creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_authorization_is_enforced(self):
        """Test that the api has user authorization."""
        new_client = APIClient()
        res = new_client.get('/expenselist/', kwargs={'pk': 3}, format="json")
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_get_a_bucketlist(self):
        """Test the api can get a given expenses."""
        expense = Expenses.objects.get(id=1)
        response = self.client.get(
            '/expenselist/',
            kwargs={'pk': expense.id}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_can_update_expenselist(self):
        """Test the api can update a given expenselist."""
        expense = Expenses.objects.get()
        change_expenselist = {'name': 'Something new'}
        res = self.client.put(
            reverse('details', kwargs={'pk': expense.id}),
            change_expenselist, format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_delete_expenselist(self):
        """Test the api can delete a expenselist."""
        expenses = Expenses.objects.get()
        response = self.client.delete(
            reverse('details', kwargs={'pk': expenses.id}),
            format='json',
            follow=True)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)