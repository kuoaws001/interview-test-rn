import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react'
import axios, { endpoints } from '../util/axios'

const PageOneScreen = () => {

    const [sum, setSum] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get(endpoints.financial.figures)
            const { data } = response.data;

            // totalAmount
            const result = data.reduce((pre, current) => {
                const temp = (pre + current.attributes.totalAmount).toFixed(2);
                return Number(temp);
            }, 0)

            setSum(result)
        }

        fetchData();
    }, [])

    return (
        <View style={styles.rootContainer}>
            <Text>{` 調用 https://interview.m-inno.com/api/figures`}</Text>
            <Text>{`totalAmount: ${sum}`}</Text>
        </View>
    );
}

export default PageOneScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlight: {
        fontWeight: 'bold',
        color: '#eb1064',
    },
});
