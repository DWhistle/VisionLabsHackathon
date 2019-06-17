import sqlite3

db = sqlite3.connect("database.db")
cursor = db.cursor()

cursor.execute("CREATE TABLE model (VARCHAR models)")