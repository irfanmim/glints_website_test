from django.db import models

# Create your models here.
class Restaurant(models.Model):
    # requester = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name="exams")
    name = models.CharField(max_length=100)
    schedule = models.TextField(blank=True)

    def __str__(self):
        return self.name

    def getDay(selg):
        return "Monday"

class Collection(models.Model):
    name = models.CharField(max_length=100)
    restaurant = models.ManyToManyField(Restaurant)

    def __str__(self):
        return self.name