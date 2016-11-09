@extends('layouts.app')


@section('content')
    <div class="container">
        <div class="row">
            <div class="col s12 welcome-message">
                Welcome to the Trade Finance Program Bank Data Collection Tool
            </div>
            <div class="col s12 m4 offset-m4">
                <div class="panel-holder col s12">
                    <div class="panel panel-default">

                        <div class="panel-heading">Login to your account</div>

                        <div class="panel-body">

                            <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                                {{ csrf_field() }}
                                <div class="input-field form-group{{ $errors->has('email') ? ' has-error' : '' }}">


                                    <label for="email" class="control-label">E-Mail Address</label>
                                    <input id="email" type="email" class="form-control validate" name="email"
                                           value="{{ old('email') }}" autofocus>
                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                                <div class="input-field login-form form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                    <label for="password" class="col-md-4 control-label">Password</label>

                                    <input id="password" type="password" class="form-control" name="password" >

                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                                    <strong>{{ $errors->first('password') }}</strong>
                                                </span>
                                    @endif
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                </div>

                                {{--<div class="form-group">--}}
                                {{--<div class="col-md-6 col-md-offset-4">--}}
                                {{--<div class="checkbox">--}}
                                {{--<label>--}}
                                {{--<input type="checkbox" name="remember"> Remember Me--}}
                                {{--</label>--}}
                                {{--</div>--}}
                                {{--</div>--}}
                                {{--</div>--}}

                                <div class="form-group">

                                    <div class="additional-info">
                                        <div class="forget-password">
                                            <span class="caption-password">Forgot your password?</span>
                                            <br>
                                            Click
                                            <a class="reset-link" href="{{ url('/password/reset') }}">
                                                here to reset your Password.</a>
                                        </div>
                                        {{--<div class="account-creation">--}}
                                            {{--Don‘t have an account yet?<br>--}}

                                            {{--<button type="submit" class="btn btn-primary create-btn">--}}
                                                {{--Create account--}}
                                            {{--</button>--}}
                                        {{--</div>--}}
                                    </div>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
