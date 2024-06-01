class Item:
    def __init__(self, name, value):
        self.name = name
        self.value = value

class Trap(Item):
    def __init__(self, name, damage, range_effect):
        super().__init__(name, damage)
        self.range_effect = range_effect

class Treasure(Item):
    def __init__(self, name, value):
        super().__init__(name, value)

class Weapon(Item):
    def __init__(self, name, attack_bonus, value):
        super().__init__(name, value)
        self.attack_bonus = attack_bonus
