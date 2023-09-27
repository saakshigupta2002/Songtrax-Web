import React from 'react'

const EditSample = () => {
  return (
    <main>
            <h2 class="title">Edit Sample:</h2>
            <form class="card edit-card">
                <input type="text" value="" ></input>
                <div class="button-group-container">
                        <button type="button" class="bright-button">Save</button>
                </div>
            </form>

            <div class="toggle-row-container">
                <div class="row-label">
                    <h4>Instrument</h4>
                 </div>
                <div class="sequence-row-container">
                    <button class="toggle-selected">Guitar</button>
                    <button class="toggle">Piano</button>
                    <button class="toggle">Violin</button>
                    <button class="toggle">Drums</button>
                </div>
            </div>

        <div class="toggle-row-container">
            <div class="row-label">
                <h4>B</h4>
            </div>
            <div class="sequence-row-container">
                    <button class="toggle-selected"></button>
                    <button class="toggle"></button>
                    <button class="toggle"></button>
                    <button class="toggle"></button>
                    <button class="toggle-selected"></button>
                    <button class="toggle"></button>
                    <button class="toggle"></button>
                    <button class="toggle"></button>
                    <button class="toggle-selected"></button>
                    <button class="toggle"></button>
                    <button class="toggle"></button>
                    <button class="toggle"></button>
                    <button class="toggle-selected"></button>
                    <button class="toggle"></button>
                    <button class="toggle"></button>
                    <button class="toggle"></button>
            </div>
        </div>

        <div class="toggle-row-container">
            <div class="row-label">
                <h4>A</h4>
            </div>
            <div class="sequence-row-container">
                <button class="toggle-selected"></button>
                <button class="toggle"></button>
                <button class="toggle"></button>
                <button class="toggle"></button>
                <button class="toggle-selected"></button>
                <button class="toggle"></button>
                <button class="toggle"></button>
                <button class="toggle"></button>
                <button class="toggle-selected"></button>
                <button class="toggle"></button>
                <button class="toggle"></button>
                <button class="toggle"></button>
                <button class="toggle-selected"></button>
                <button class="toggle"></button>
                <button class="toggle"></button>
                <button class="toggle"></button>
            </div>
        </div>
    </main>
  )
}

export default EditSample
