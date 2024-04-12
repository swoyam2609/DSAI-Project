import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pmdarima import auto_arima
import warnings
from statsmodels.tsa.arima.model import ARIMA


def forecast(inputlst,upto):
    data=pd.DataFrame(inputlst)
    stepwise_fit=auto_arima(data,trace=True,suppress_warnings=True)
    param=stepwise_fit.get_params()
    ord=param['order']
    model=ARIMA(data,order=ord)
    model=model.fit()

    start=len(data)
    end=len(data)+upto-1
    pred=model.predict(start=start,end=end,typ='levels').rename('ARIMA Predictions')
    res = pred.astype(int)
    for i in res:
        inputlst.append(i)
    return inputlst