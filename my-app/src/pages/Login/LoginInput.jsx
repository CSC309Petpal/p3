import React from "react"

const LoginInput = (props) => {

        const {id, input_lable_value, type_value, input_value, update, placeholder_value, is_required} = props

        var notification = input_lable_value + "_notification"
        if (is_required){
            return (<label className="mb-4 row" htmlFor={input_lable_value}>
                
                <label className="col-sm-4 col-form-label">{input_lable_value}</label>
                <div className="col-sm-11">
                    <input id={id} className="form-control" type={type_value} placeholder={placeholder_value} value={input_value} onChange={(e) => update(e.target.value)} required/>
                </div>
                <p id={notification} style={{color: "red"}}></p>

            </label>)

        }else{

            return (<label className="mb-4 row" htmlFor={input_lable_value}>
                
                <label className="col-form-label">{input_lable_value}</label>
                <div className="col-sm-11">
                    <input id={id} className="form-control" type={type_value} placeholder={placeholder_value} value={input_value} onChange={(e) => update(e.target.value)}/>
                </div>
                <p id={notification}></p>

            </label>)
        }
}

export default LoginInput