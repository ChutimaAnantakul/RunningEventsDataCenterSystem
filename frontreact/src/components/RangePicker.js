import React from 'react'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class RangePicker extends React.Component {
    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.startDate == null && nextProps.endDate == null) {
            this.setState({
                startValue: nextProps.startDate,
                endValue: nextProps.endDate
            })
        }
    }

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.onChange('startValue', value);
        this.props.setStartDate(value)
    };

    onEndChange = value => {
        this.onChange('endValue', value);
        this.props.setEndDate(value)
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    render() {
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div>
                <DatePicker
                    disabledDate={this.disabledStartDate}

                    format="YYYY-MM-DD"
                    value={startValue}
                    placeholder="Start"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                />
                <DatePicker
                    disabledDate={this.disabledEndDate}

                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="End"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                />
            </div>
        );
    }
}

export default RangePicker