import 'reactn'
import { Label } from '../typings'

declare module 'reactn/default' {
	export interface State {
		labels: Label[]
	}
}
