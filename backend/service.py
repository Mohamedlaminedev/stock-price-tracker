import yfinance as yf

def get_stock_price(symbol: str):
    """
    Fetch the current stock price for a given symbol.
    Returns a dictionary with 'symbol' and 'price', or 'error' if not found.
    """
    try:
        stock = yf.Ticker(symbol)
        price = stock.info.get("regularMarketPrice")
        if price is None:
            return {"error": "Stock not found or no market price available"}
        return {"symbol": symbol, "price": price}
    except Exception as e:
        return {"error": str(e)}