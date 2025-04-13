__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Lisiecki Wojciech 4D"

from datetime import date

class Student:
    def __init__(self, _id: int, first_name: str, last_name: str, birth_date: date):
        self._id = _id
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date

    @property
    def age(self) -> int:
        return date.today().year - self.birth_date.year

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name} ({self.age})"
