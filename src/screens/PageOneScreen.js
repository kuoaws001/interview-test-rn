import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react'
import axios, { endpoints } from '../util/axios'
import { setSession } from '../util/auth'
import Button from '../components/ui/Button'

const PageOneScreen = () => {

    const [sum, setSum] = useState(0);

    const fetchData = async () => {
        axios.get(endpoints.financial.figures)
            .then(res => {
                const { data } = res.data;

                // totalAmount
                const result = data.reduce((pre, current) => {
                    const temp = (pre + current.attributes.totalAmount).toFixed(2);
                    return Number(temp);
                }, 0)

                setSum(result)
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    axios.post(endpoints.auth.refresh)
                        .then(res => {
                            setSession(res.data.jwt);
                            fetchData();
                        })
                }
            })
    }

    const handlePress = () => {
        fetchData();
    }

    return (
        <View style={styles.rootContainer}>
            <Button onPress={handlePress}>
                {` call api/figures`}
            </Button>
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
