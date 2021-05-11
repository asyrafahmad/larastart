<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">User Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>


                </div>

                <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                    <button class="btn btn-success" @click="newModal">Add New<i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.type | upText }}</td>
                      <td>{{ user.createdAt | myDate }}</td>
                      <td>
                          <a href="#"  @click="editModal(user)">
                              <i class="fa fa-edit blue"></i>
                          </a>/
                          <a href="#" @click="deleteUser(user.id)">
                              <i class="fa fa-trash red"></i>
                          </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            </div>
        </div>


        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Add New</h5>
                    <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update User's Info</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="editmode ? updateUser() : createUser()">
                    <div class="modal-body">
                        <div class="form-group">
                            <input v-model="form.name" type="text" name="name" placeholder="Name" class="form-control" :class="{ 'is-invalid':form.errors.has('name') }">
                            <!-- <has-error :form="form" field="name"></has-error> -->
                        </div>
                        <div class="form-group">
                            <input v-model="form.email" type="email" name="email" placeholder="Email" class="form-control" :class="{ 'is-invalid':form.errors.has('email') }">
                            <!-- <has-error :form="form" field="email"></has-error> -->
                        </div>
                        <div class="form-group">
                            <textarea v-model="form.bio" name="bio" placeholder="Short bio for user (Optional)" class="form-control" :class="{ 'is-invalid':form.errors.has('bio') }"></textarea>
                            <!-- <has-error :form="form" field="bio"></has-error> -->
                        </div>
                        <div class="form-group">
                            <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="author">Author</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input v-model="form.password" type="password" name="password" id="password" placeholder="Password" class="form-control" :class="{ 'is-invalid':form.errors.has('password') }">
                            <!-- <has-error :form="form" field="password"></has-error> -->
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
                        <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                editmode: false,
                users:{},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: '',
                })
            }
        },
        methods: {
            updateUser(){
                this.$Progress.start();
                this.form.put('/api/user/'+this.form.id)
                .then(() => {
                    // if successfull
                    $('#addNew').modal('hide');
                    // swal(
                    //     'Updated!',
                    //     'Information has been updated.',
                    //     'success'
                    //     )

                    this.$Progress.finish();
                    Fire.$emit('AfterCreate');

                })
                .catch(() => {
                    this.$Progress.fail();
                })
            },
            editModal(user){
                this.editmode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);
            },
            newModal(){
                this.editmode = false;
                this.form.reset();

                $('#addNew').modal('show')
            },
            deleteUser(id){
                // swal({
                //     title: 'Are you sure?',
                //     text: "You won't be able to revert this!",
                //     icon: 'warning',
                //     showCancelButton: true,
                //     confirmButtonColor: '#3085d6',
                //     cancelButtonColor: '#d33',
                //     confirmButtonText: 'Yes, delete it!'
                //     }).then((result) => {


                            // if(result.value){
                                //send ajax request to the server
                                this.form.delete('api/user/'+id)
                            //     .then(()=>{
                            //         if (result.isConfirmed) {
                            //             swal(
                            //             'Deleted!',
                            //             'Your file has been deleted.',
                            //             'success'
                            //             )
                                        Fire.$emit('AfterCreate');
                            //         }
                            //     })
                            //     .catch(()=>{
                            //         swal("Failed!", "There was something wrong.", "warning");
                            //     })
                            // })
                            // }
            },
            loadUsers(){
                axios.get("api/user")
                .then( ({data}) => (this.users = data.data) );
            },
            createUser(){
                this.$Progress.start();

                this.form.post('api/user')
                .then(()=>{

                    Fire.$emit('AfterCreate');                          // vueJS custom event

                    $('#addNew').modal('hide')
                    toast({
                        type: 'success',
                        title: 'User Created is successfully'
                    })

                    this.$Progress.finish()
                })
                .catch(()=>{

                })

            }
        },
        created() {
            this.loadUsers();
            Fire.$on('AfterCreate',() => {
                this.loadUsers();                                   // vueJS custom event
            })
            // setInterval( ()=>this.loadUsers(), 3000);            // to keep refreshing the page
        },
        mounted() {
            console.log('Component mounted.');
        }
    }
</script>
