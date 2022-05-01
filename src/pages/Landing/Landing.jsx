import styles from './Landing.module.css'

const Landing = ({ user, profile}) => {
  return (
    <main className={styles.container}>
      <h1 className="mt-8 text-center text-3xl font-bold">Welcome {user ? 'back, ' + profile.name + '!' : 'to Shakn 🍸'}</h1>
      
    </main>
  )
}

export default Landing
