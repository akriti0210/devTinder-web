import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, image, age, gender } = user;
    const { title, name } = user.company;
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
            <img
            src={image}
            alt="photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName+" "+lastName}</h2>
            <p>{age + ", " + gender}</p>
            <p>My name is {firstName}. By profession I am {title} and working with {name}.</p>
            <div className="card-actions justify-center my-4">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard
