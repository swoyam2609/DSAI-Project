


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
    return pred.astype(int)
