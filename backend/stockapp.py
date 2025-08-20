from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from service import get_stock_price  # import from your service.py

api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@api.get("/stock-sync/{symbol}")
def stock_endpoint(symbol: str):
    return get_stock_price(symbol)  # call the function from service.py
