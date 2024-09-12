import {Stack} from 'expo-router'

const PostsLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='posttoptabs' options={{headerShown:false}}/>
        </Stack>
    );
}
export default PostsLayout;