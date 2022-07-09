from psycopg2 import pool
import os
from contextlib import contextmanager


connection_pool = pool.SimpleConnectionPool(
    0,
    20,
    user=os.environ.get("DB_USER"),
    password=os.environ.get("DB_PASSWORD"),
    host=os.environ.get("DB_HOST"),
    port=os.environ.get("DB_PORT"),
    database=os.environ.get("DB_DATABASE"),
)


@contextmanager
def get_curs():
    conn = connection_pool.getconn()
    try:
        with conn:
            yield conn.cursor()
    finally:
        connection_pool.putconn(conn=conn)


