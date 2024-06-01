import pygame
import random
import os
from character import Hero, Enemy
from item import Trap, Treasure, Weapon
from map import GameMap

# Definición de la clase Projectile
class Projectile(pygame.sprite.Sprite):
    def __init__(self, x, y, image):
        super().__init__()
        self.image = image
        self.rect = self.image.get_rect(center=(x, y))
        self.speed = 5

    def update(self):
        self.rect.y -= self.speed

    def draw(self, screen):
        screen.blit(self.image, self.rect)

# Definición de la clase Star
class Star:
    def __init__(self, x, y, speed):
        self.x = x
        self.y = y
        self.speed = speed

    def update(self):
        self.y += self.speed

    def draw(self, screen):
        pygame.draw.circle(screen, WHITE, (self.x, self.y), 2)

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Juego de Aventura Espacial")

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

hero_image_path = os.path.join('static', 'frame1.png')
projectile_image_path = os.path.join('static', 'frame2.png')  # Corregido
enemy_image_path = os.path.join('static', 'frame3.png')

hero_image = pygame.image.load(hero_image_path)
hero_image = pygame.transform.scale(hero_image, (40, 40))

projectile_image = pygame.image.load(projectile_image_path)
projectile_image = pygame.transform.scale(projectile_image, (10, 10))

enemy_image = pygame.image.load(enemy_image_path)
enemy_image = pygame.transform.scale(enemy_image, (40, 40))

game_map = GameMap(800, 600)
hero = Hero("Heroe", 100, 10, 5, 1)
hero.rect = hero_image.get_rect(center=(400, 300))

enemies = []
projectiles = []

score = 0
level = 1
game_over = False

clock = pygame.time.Clock()

def handle_events():
    global game_over
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_over = True
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and not game_over:
                create_projectile()
            elif event.key == pygame.K_r and game_over:
                restart_game()

def create_projectile():
    projectile = Projectile(hero.rect.centerx, hero.rect.top, projectile_image)
    projectiles.append(projectile)

def restart_game():
    global game_over, hero, enemies, score, level
    hero.health = 100
    hero.inventory = []
    enemies = []
    game_over = False
    score = 0
    level = 1

def draw_game_info(screen, hero):
    font = pygame.font.Font(None, 36)
    health_text = font.render(f'Salud: {hero.health}', True, WHITE)
    screen.blit(health_text, (10, 10))
    score_text = font.render(f'Puntos: {score}', True, WHITE)
    screen.blit(score_text, (10, 50))
    inventory_text = font.render(f'Inventario: {len(hero.inventory)} ítems', True, WHITE)
    screen.blit(inventory_text, (10, 90))
    level_text = font.render(f'Nivel: {level}', True, WHITE)
    screen.blit(level_text, (10, 130))

def draw_game_over(screen):
    font = pygame.font.Font(None, 72)
    game_over_text = font.render('GAME OVER', True, WHITE)
    screen.blit(game_over_text, (200, 250))

    font = pygame.font.Font(None, 36)
    prompt_text = font.render('Presiona R para reiniciar', True, WHITE)
    screen.blit(prompt_text, (250, 350))

def draw_you_win(screen):
    font = pygame.font.Font(None, 72)
    you_win_text = font.render('YOU WIN!', True, WHITE)
    screen.blit(you_win_text, (200, 250))

# Lista de estrellas
stars = []

# Bucle principal del juego
while not game_over:
    handle_events()

    if not game_over:
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            hero.rect.x -= 5
        if keys[pygame.K_RIGHT]:
            hero.rect.x += 5
        if keys[pygame.K_UP]:
            hero.rect.y -= 5
        if keys[pygame.K_DOWN]:
            hero.rect.y += 5

        game_map.update(hero, enemies, traps=[], treasures=[])

        for projectile in projectiles:
            projectile.update()

        # Crear nuevas estrellas aleatoriamente con menos frecuencia
        if random.randint(0, 5) == 0:
            new_star = Star(random.randint(0, 800), 0, random.randint(1, 3))
            stars.append(new_star)

        # Actualizar la posición de las estrellas
        for star in stars:
            star.update()

        if random.randint(0, 50) == 0:
            enemy = Enemy("Enemigo", 50, 5, 2, "Goblin")
            enemy.rect = enemy_image.get_rect(center=(random.randint(0, 800), 0))
            enemies.append(enemy)

        for enemy in enemies:
            enemy.rect.y += 5
            if enemy.rect.colliderect(hero.rect):
                hero.health -= 10
                enemies.remove(enemy)
                if hero.health <= 0:
                    game_over = True

        for projectile in projectiles:
            for enemy in enemies:
                if projectile.rect.colliderect(enemy.rect):
                    projectiles.remove(projectile)
                    enemies.remove(enemy)
                    score += 5
                    if score >= 50:
                        level += 1
                        score = 0
                        draw_you_win(screen)

    screen.fill(BLACK)
    screen.blit(hero_image, hero.rect.topleft)
    for projectile in projectiles:
        projectile.draw(screen)
    for enemy in enemies:
        screen.blit(enemy_image, enemy.rect.topleft)
    draw_game_info(screen, hero)

    # Dibujar estrellas
    for star in stars:
        star.draw(screen)

    if game_over:
        draw_game_over(screen)

    pygame.display.flip()
    clock.tick(60)

    # Bucle para reiniciar el juego
    while game_over:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_r:
                # Reiniciar el juego
                restart_game()
                # Salir del bucle de reinicio y volver al bucle principal del juego
                game_over = False
                break

        screen.fill(BLACK)
        if game_over:
            draw_game_over(screen)
        pygame.display.flip()
        clock.tick(60)

pygame.quit()

