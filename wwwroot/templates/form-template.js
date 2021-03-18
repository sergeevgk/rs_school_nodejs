export const modalFormTemplate = `
    <div id="prompt-form-container">
        <form id="prompt-form">
            <div class="form-row">
                <div class="col-md-12">
                    <label for="input-name">Name</label>
                    <input type="text" class="form-control" id="input-name" placeholder="Name" value="Mark">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-12">
                    <label for="input-login">Login</label>
                    <input type="text" class="form-control" id="input-login" placeholder="Login" value="Mark123">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-12">
                    <label for="input-password">Password</label>
                    <input type="text" class="form-control" id="input-password" placeholder="Password" value="qwerty">
                </div>
            </div>
            <div class="form-buttons">
                <button class="btn btn-primary" type="submit">Submit user</button>
                <button class="btn btn-primary" name="cancel" type="button">Cancel</button>
            </div>
        </form>
    </div>
`;