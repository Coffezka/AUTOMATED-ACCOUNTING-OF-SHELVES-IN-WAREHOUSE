// Reactn documentation: https://github.com/CharlesStover/reactn#table-of-contents
// import addReactNDevTools from 'reactn-devtools'
import init from 'reactn-persist'
import initialGlobal from './initialGlobal'
import persistedKeys from './persistedKeys'
import reactn from 'reactn'
export {
	getDispatch,
	getGlobal, // const token = getGlobal().auth.token
	resetGlobal, // resetGlobal()
	setGlobal, // setGlobal({ value: 3 })
	useGlobal, // const [count, setCount] = useGlobal('count')
	withInit, // withInit(INITIAL_STATE, INITIAL_REDUCERS)(AppComponent)
	withGlobal,
} from 'reactn'

init({
	storage: localStorage,
	whitelist: persistedKeys,
	initialValue: initialGlobal,
	debounceDelay: 0,
	provider: reactn,
})
