from flask import Flask, jsonify, render_template
import sqlalchemy as sql

app=Flask(__name__)
engine=sql.create_engine('sqlite:///data/db.sqlite')


# Points the to the directions of the data source
@app.route('/data')
def return_data(): 
    results=engine.execute('select * from data').all()
    social_df=[]
    for each_result in results: 
        create_poloy=eval(each_result[0])
        social_df.append(create_poloy)
    return jsonify(social_df)

# Points the to the directions of the data source
@app.route('/data_table')
def other_data(): 
    results=engine.execute('select * from data').all()
    data=[]
    for each_result in results: 
        data.append(list(each_result))
    return jsonify(data)




# Call's upon the the HTLM file
@app.route('/')
def home(): 
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)