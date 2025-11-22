import { redirect } from 'next/navigation'
import { env } from './env'
function DevMode() {
    if (env.NEXT_PUBLIC_INVISIBLE_MODE === "true") {
        redirect("https://github.com/punyakrit")
    }
    return null
}

export default DevMode