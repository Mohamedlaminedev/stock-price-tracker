from fastapi import FastAPI
from service import get_stock_price


api = FastAPI()

#GET, POST, PUT, DELETE

@api.get("/")
def index():
    return {"message" : "hello i am learning programming"}

@api.get("/calculation")
def calculation():
    total = sum(i*i for i in range(1000))
    return {"result" : total}


@api.get("/stock-sync/{symbol}")
def stock_sync(symbol: str):
    return get_stock_price(symbol)