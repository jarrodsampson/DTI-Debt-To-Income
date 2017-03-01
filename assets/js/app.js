
$(document).ready(function(){
    $('.parallax').parallax();
});

// get transitions initialized
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var DTIBox = React.createClass({
    getInitialState: function() {

        this.state = {name: ''};
        this.state = {description: ''};
        this.state = {cost: ''};
        this.state = {salary: ''};

        return {
            data: [],
            total: 0,
            annualSalary: 0,
            dti: 0

        };
    },
    componentDidMount: function() {
    },
    removeItem: function (i) {
        // removal of item from main component

        this.setState({loadVisible: true});

        console.log(this.state.data[i]);
        this.state.total -= this.state.data[i].amount;
        this.setState({total: this.state.total });

        this.state.dti = this.state.total / this.state.salary * 100;
        this.setState({dti: this.state.dti });

        Materialize.toast('Expense Removed: ' + this.state.data[i].name, 4000);

        this.setState( {data : React.addons.update( this.state.data , { $splice : [[i,1]] }  ) });

        setTimeout(function(){

            this.setState({loadVisible: false});

        }.bind(this),100);

    },
    addExpense: function(e) {
        e.preventDefault();

        // adding in an expense

        if (typeof this.state.name == "undefined"
            || typeof this.state.description == "undefined"
            || typeof this.state.amount == "undefined"
            || isNaN(this.state.amount)
            || this.state.amount == 0) {

            Materialize.toast('Please Add a valid Expense.', 4000);

        } else {

            this.setState({loadVisible: true});

            var expenseObj = {
                id: this.state.data.length + 1,
                name:this.state.name,
                description:this.state.description,
                amount:parseFloat(this.state.amount)
            };

            this.state.total += expenseObj.amount;
            this.state.dti = this.state.total / this.state.salary * 100;

            this.setState({data: this.state.data.concat([expenseObj])});
            this.setState({total: this.state.total });
            this.setState({dti: this.state.dti });

            Materialize.toast('Expense Added: ' + this.state.name, 4000);

            this.state.name = "";
            this.state.amount = "";
            this.state.description = "";

            console.log("Added New Expense", this.state.data);

            setTimeout(function(){

                this.setState({loadVisible: false});

            }.bind(this),100);
        }


    },
    addSalary: function(e) {
        e.preventDefault();

        if (isNaN(this.state.salary)) {
            Materialize.toast('Gross Monthly Must be a Number.', 4000);
        }
        else if (this.state.salary > 0 && this.state.salary != this.state.annualSalary) {

            this.setState({loadVisible: true});

            this.setState({annualSalary: this.state.salary });
            this.state.dti = this.state.total / this.state.salary * 100;
            this.setState({dti: this.state.dti });

            console.log("Added Salary", this.state.salary);
            Materialize.toast('Gross Monthly Income Added: ' + parseFloat(this.state.salary).toFixed(2), 4000);

            setTimeout(function(){

                this.setState({loadVisible: false});

            }.bind(this),10);
        }
    },
    clearAllExpenses: function () {
        // confirm to remove all

        //var con = confirm("Are you sure you want to remove Everything?");
        //if (con) {
        // clear all data
        this.setState({
            data: [],
            total: 0,
            annualSalary: 0,
            dti: 0
        });
        this.state = {salary: ''};

        Materialize.toast('All Expenses Removed.', 4000);
        //}
    },
    toggleAdd: function() {
        this.setState({childAddVisible: !this.state.childAddVisible});
    },
    onNameChange: function(e) {
        this.setState({name: e.target.value});
    },
    onDescChange: function(e) {
        this.setState({description: e.target.value});
    },
    onAmountChange: function(e) {
        this.setState({amount: e.target.value});
    },
    onSalaryChange: function(e) {
        this.setState({salary: e.target.value});
    },
    render: function() {
        return (
            <div className="dtiBox">

            <div className="row">

            <ReactCSSTransitionGroup
        transitionName="example2"
        transitionAppear={true}
        transitionEnterTimeout={5100}
        transitionAppearTimeout={5100}
        transitionLeaveTimeout={5100}>

            <div className="col s12 m12">
            <h2>Debt To Income Ratio</h2>
        <blockquote>
        Helping you better understand your credit.
        </blockquote>
        </div>

        </ReactCSSTransitionGroup>

        <div className="col s6 m6">
            <div className="col s12 m12">

            <div className="col s6 m6 no-padding">
            <p>Total: ${ parseFloat(this.state.total).toFixed(2)}</p>
        </div>

        <div className="col s6 m6 no-padding">
            <p>Gross: ${ parseFloat(this.state.annualSalary).toFixed(2) }</p>
        </div>

        </div>
        <div className="col s12 m12">
            <div>
            {/* Add A new Item */}
            <button className="waves-effect waves-light btn blue darken-1" onClick={ this.toggleAdd }>Add New</button>&nbsp;
        {/* Delete Everything! */}
        <button className="waves-effect waves-light btn blue darken-1" onClick={ this.clearAllExpenses } disabled={this.state.data.length <= 0}>Erase All</button>
        </div>

        { this.state.childAddVisible ?
        <form onSubmit={this.addExpense}>
        <div className="col s12 m12">
            <div className="col s12 m12">
            <input onChange={this.onNameChange} value={this.state.name} placeholder="Expense Name" maxLength="50" />
            </div>
            <div className="col s12 m12">
            <input onChange={this.onAmountChange} value={this.state.amount} placeholder="Expense Amount" maxLength="7" />
            </div>
            <div className="col s12 m12">
            <textarea className="materialize-textarea" onChange={this.onDescChange} value={this.state.description} placeholder="Description" data-length="70"></textarea>
            </div>
            </div>

            <button className="waves-effect waves-light btn blue darken-1">Add Expense</button>
        </form>

        : null }

        </div>

        <div className="col s12 m12">

            <form onSubmit={this.addSalary}>
        <input type="text" onChange={this.onSalaryChange} value={this.state.salary} placeholder="Monthly Gross" maxLength="7" />
            <button className="waves-effect waves-light btn blue darken-1" disabled={this.state.annualSalary.length <= 0}>Add Monthly Gross</button>
        </form>

        </div>
        </div>

        <div className="col s6 m6 center-align">

            <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionEnterTimeout={5100}
        transitionAppearTimeout={5100}
        transitionLeaveTimeout={5100}>

            <p>
            <span className="dti">
        { this.state.annualSalary == 0 ?
            'DTI 0.00%'
            :
        'DTI ' + parseFloat(this.state.dti).toFixed(2) + '%'
    }
        </span><br />
        { this.state.loadVisible === false ?
        <span className="infoBar">
            { parseFloat(this.state.dti).toFixed(2) > 43 ? 'DTI is too high, lenders prefer to see this under 43%.' : ''}
        { parseFloat(this.state.dti).toFixed(2) > 36 && parseFloat(this.state.dti).toFixed(2) <= 43 ? 'DTI is fine, typically not a concern until above 43%.' : ''}
        { parseFloat(this.state.dti).toFixed(2) > 10 && parseFloat(this.state.dti).toFixed(2) <= 36 ? 'DTI is doing great! Lenders like to see that you can manage a reasonable debt.' : ''}
        { parseFloat(this.state.dti).toFixed(2) > 0 && parseFloat(this.state.dti).toFixed(2) <= 10 ? 'DTI is doing okay, however Lenders like more payments to see that you can manage a reasonable debt.' : ''}
        { this.state.dti == 0 ? 'No Advice yet, please fill out your monthly gross income and some expenses to get started!' : ''}
        </span>
        : null }


        </p>

        { this.state.loadVisible ?
        <div className="col s12 m12">

            <div className="progress">
            <div className="indeterminate blue"></div>
            </div>
            </div>
        : null }

        </ReactCSSTransitionGroup>
        </div>
        </div>

        <div className="col s12 m12">
        <p>
        {this.state.data.length == 1 ? (this.state.data.length) + ' Expense Added.' : '' }
        {this.state.data.length > 1 ? (this.state.data.length) + ' Expenses Added.' : '' }
        {this.state.data.length <= 0 ? 'No Expenses Added.' : '' }
        </p>
        </div>

        <div className="col s12 m12">

            {/* animation fade for list */}

            <ReactCSSTransitionGroup
        transitionName="example2"
        transitionAppear={true}
        transitionEnterTimeout={5100}
        transitionAppearTimeout={5100}
        transitionLeaveTimeout={5100}>

            <ExpenseList
        data={this.state.data}
        onRemoveItem={this.removeItem}
        />

        </ReactCSSTransitionGroup>
        </div>
        </div>
        );
    }

});

var ExpenseList = React.createClass({
    removeItem: function(i) {
        this.props.onRemoveItem(i);
    },
    render: function() {
        var rows = [];
        this.props.data.map(function(expense, i) {

            // gather data from the JSON file here after filtering
            rows.push(<Expense
            id={expense.id}
            key={expense.id}
            name={expense.name}
            amount={expense.amount}
            description={expense.description}
            onClick={this.removeItem.bind(this, i)} />);

        }.bind(this));
        //console.log(rows);
        // show UI feedback if there are no rows in the result set
        if (rows.length >= 1) {
            return (
                <table className="expenseList striped highlight">
                <thead>
                <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
                </table>
        );
        } else {
            return (

                <table className="mails">
                <thead>
                <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td><p><em>No Expenses Found.</em></p></td>
            </tr>
            </tbody>
            </table>
        );
        }

    }
});

var Expense = React.createClass({

    viewDetails: function (data) {

        // view details of object
        var info = data.name + "\n" +
            data.amount + "\n" +
            data.description;

        var infoHTML = data.name + "<br />" +
            "$" + data.amount + "</br />" +
            data.description;
        //alert(info);
        console.log(info);

        Materialize.toast(infoHTML, 6000);

    },

    render: function() {
        // the component to display the data here
        return (
            <tr className="expense">
            <td>
            { this.props.name }
        </td>
        <td>
        ${parseFloat(this.props.amount).toFixed(2)}
        </td>
        <td>
        {this.props.description}
        </td>
        <td>
        <button className="waves-effect waves-light btn blue darken-1" onClick={ this.props.onClick }>
        <i className="material-icons">delete</i>
            </button>&nbsp;
        <button className="waves-effect waves-light btn blue darken-1" onClick={ this.viewDetails.bind(this, this.props) }><i className="large material-icons icon-purple">search</i></button>
            </td>
            </tr>
        );
    }
});

ReactDOM.render(
<DTIBox />,
    document.getElementById('dtiContentApp')
);